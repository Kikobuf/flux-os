#!/bin/bash
# flux/install/phase2/all.sh
# Phase 2: Hardware & UX basics

set -euo pipefail

echo "→ Phase 2: Hardware & UX basics..."

# ── Touchpad gestures ─────────────────────────────────────────────────────────
echo "  → Configuring touchpad gestures..."
# Install libinput gestures for extra gesture support
sudo pacman -S --noconfirm --needed libinput
# Hyprland gestures are configured via default/hypr/gestures.lua (already in repo)
echo "  ✓ Touchpad gestures configured"

# ── Screenshot tools ──────────────────────────────────────────────────────────
echo "  → Installing screenshot tools..."
sudo pacman -S --noconfirm --needed \
  grimblast \
  swappy \
  grim \
  slurp
echo "  ✓ Screenshot tools installed"

# ── Dolphin file manager ──────────────────────────────────────────────────────
echo "  → Installing Dolphin file manager..."
sudo pacman -S --noconfirm --needed \
  dolphin \
  dolphin-plugins \
  ffmpegthumbs \
  kdegraphics-thumbnailers \
  kio-extras

# Set Dolphin as default file manager
xdg-mime default org.kde.dolphin.desktop inode/directory 2>/dev/null || true
echo "  ✓ Dolphin installed and set as default file manager"

# ── Trash that works ──────────────────────────────────────────────────────────
echo "  → Configuring trash..."
sudo pacman -S --noconfirm --needed trash-cli
# Ensure XDG trash dir exists
mkdir -p "$HOME/.local/share/Trash/files"
mkdir -p "$HOME/.local/share/Trash/info"
# Add alias so 'rm' warns if used directly
echo 'alias rm="echo Use trash-put instead of rm, or use /bin/rm for real deletion; false"' >> ~/.bashrc 2>/dev/null || true
echo "  ✓ Trash configured"

# ── Recent files ──────────────────────────────────────────────────────────────
echo "  → Configuring recent files..."
sudo pacman -S --noconfirm --needed \
  xdg-utils \
  gtk3  # provides GTK recent files support
# Recent files are tracked by GTK/Qt automatically once enabled
mkdir -p "$HOME/.local/share/recently-used"
echo "  ✓ Recent files enabled"

# ── KDE Connect ───────────────────────────────────────────────────────────────
echo "  → Installing KDE Connect..."
sudo pacman -S --noconfirm --needed kdeconnect
# Enable firewall rules for KDE Connect
sudo ufw allow 1714:1764/udp 2>/dev/null || true
sudo ufw allow 1714:1764/tcp 2>/dev/null || true
# Enable KDE Connect daemon
systemctl --user enable --now kdeconnect 2>/dev/null || true
echo "  ✓ KDE Connect installed"

# ── LocalSend ─────────────────────────────────────────────────────────────────
echo "  → Installing LocalSend..."
yay -S --noconfirm localsend-bin
# Firewall rules for LocalSend
sudo ufw allow 53317/tcp 2>/dev/null || true
sudo ufw allow 53317/udp 2>/dev/null || true
echo "  ✓ LocalSend installed"

# ── Monitor wizard hook ───────────────────────────────────────────────────────
echo "  → Setting up monitor auto-detection..."
# Install udev rule to trigger monitor wizard on hotplug
sudo tee /etc/udev/rules.d/99-flux-monitor-hotplug.rules > /dev/null << 'EOF'
ACTION=="change", SUBSYSTEM=="drm", RUN+="/bin/su %k -c 'DISPLAY=:0 HYPRLAND_INSTANCE_SIGNATURE=$(ls /tmp/hypr/ 2>/dev/null | head -1) flux-monitor-wizard'"
EOF
sudo udevadm control --reload-rules 2>/dev/null || true
echo "  ✓ Monitor auto-detection configured"

echo "✓ Phase 2 complete!"
