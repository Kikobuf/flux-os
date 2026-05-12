#!/bin/bash
# flux/install/security/defaults.sh
# Configures security defaults for Flux

set -euo pipefail

echo "  → Configuring security..."

# ── Firewall (ufw) ────────────────────────────────────────────────────────────
echo "  → Setting up firewall..."
sudo pacman -S --noconfirm --needed ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
# Allow KDE Connect
sudo ufw allow 1714:1764/udp
sudo ufw allow 1714:1764/tcp
# Allow LocalSend
sudo ufw allow 53317/tcp
sudo ufw allow 53317/udp
sudo ufw --force enable
sudo systemctl enable ufw

# ── SSD TRIM ─────────────────────────────────────────────────────────────────
echo "  → Enabling SSD TRIM scheduler..."
sudo systemctl enable --now fstrim.timer

# ── Auto-updates (pacman timer) ───────────────────────────────────────────────
echo "  → Configuring update schedule..."
# Disabled by default — user can enable in Flux Settings
sudo tee /etc/systemd/system/flux-autoupdate.service > /dev/null << 'EOF'
[Unit]
Description=Flux Automatic System Update

[Service]
Type=oneshot
ExecStart=/usr/bin/pacman -Syu --noconfirm
EOF

sudo tee /etc/systemd/system/flux-autoupdate.timer > /dev/null << 'EOF'
[Unit]
Description=Flux Automatic Update Timer

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
EOF
# Note: timer is installed but NOT enabled by default
# User enables it via Flux Settings → Updates → Automatic Updates

# ── VPN client (NetworkManager with WireGuard/OpenVPN support) ────────────────
echo "  → Installing VPN client support..."
sudo pacman -S --noconfirm --needed \
  networkmanager-openvpn \
  networkmanager-vpnc \
  wireguard-tools

# ── Crash reporter ────────────────────────────────────────────────────────────
echo "  → Setting up crash reporter..."
sudo pacman -S --noconfirm --needed systemd-coredump
sudo mkdir -p /etc/systemd/coredump.conf.d
sudo tee /etc/systemd/coredump.conf.d/flux.conf > /dev/null << 'EOF'
[Coredump]
Storage=external
Compress=yes
ProcessSizeMax=2G
EOF

# Flux crash reporter daemon (shows GUI dialog on crash)
cat > "${HOME}/.local/bin/flux-crash-reporter" << 'SCRIPT'
#!/bin/bash
# Called by systemd on process crash
# Shows a GTK dialog asking user if they want to report
APP_NAME="$1"
zenity --question \
  --title="Flux Crash Reporter" \
  --text="${APP_NAME} crashed unexpectedly.\n\nWould you like to send a crash report to help fix this?" \
  --ok-label="Send Report" \
  --cancel-label="Dismiss" && \
  journalctl -b -1 | tail -100 | curl -s -X POST https://crashes.fluxos.dev/report \
    -H "Content-Type: text/plain" \
    --data-binary @- || true
SCRIPT
chmod +x "${HOME}/.local/bin/flux-crash-reporter"

echo "  ✓ Security configured"
