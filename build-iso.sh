#!/bin/bash
# flux-iso-build — builds a bootable Flux OS ISO
# Run this on an Arch Linux machine with archiso installed
#
# Usage:
#   ./build-iso.sh              # full build
#   ./build-iso.sh --fast       # skip package cache rebuild
#   ./build-iso.sh --clean      # clean build dirs and exit
#
# Output: flux-<version>-x86_64.iso in ./out/

set -euo pipefail

FLUX_VERSION=$(cat version 2>/dev/null || echo "0.1.0")
PROFILE_DIR="$(pwd)/iso-profile"
WORK_DIR="$(pwd)/iso-work"
OUT_DIR="$(pwd)/out"
ISO_NAME="flux-${FLUX_VERSION}-x86_64.iso"

# Colors
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
info()    { echo -e "${GREEN}→${NC} $*"; }
warn()    { echo -e "${YELLOW}⚠${NC} $*"; }
error()   { echo -e "${RED}✗${NC} $*"; exit 1; }
success() { echo -e "${GREEN}✓${NC} $*"; }

# ── Preflight ──────────────────────────────────────────────────────────────

preflight() {
  info "Running preflight checks..."

  [ "$EUID" -eq 0 ] || error "Must run as root: sudo ./build-iso.sh"

  command -v mkarchiso &>/dev/null || {
    info "Installing archiso..."
    pacman -S --noconfirm archiso
  }

  command -v mksquashfs &>/dev/null || {
    info "Installing squashfs-tools..."
    pacman -S --noconfirm squashfs-tools
  }

  success "Preflight passed"
}

# ── Build profile ──────────────────────────────────────────────────────────

build_profile() {
  info "Setting up ISO profile..."

  # Start from archiso's releng profile
  cp -r /usr/share/archiso/configs/releng/ "$PROFILE_DIR"

  # ── packages.x86_64 ───────────────────────────────────────────────────

  # Append Flux packages on top of base Arch packages
  cat >> "$PROFILE_DIR/packages.x86_64" << 'PKGS'

# ── Flux core ──
hyprland
hyprlock
hypridle
hyprpicker
hyprsunset
hyprland-guiutils
uwsm
waybar
mako
swaybg
swayosd
sddm
walker-bin
quickshell
alacritty
tmux
zsh

# ── Display & GPU ──
mesa
xf86-video-amdgpu
vulkan-radeon
intel-media-driver
vulkan-intel
egl-wayland

# ── Core tools ──
git
fzf
zoxide
ripgrep
eza
bat
btop
lazygit
lazydocker
yazi
grim
slurp
satty
imagemagick
tesseract
tesseract-data-eng
wl-clipboard
pamixer
playerctl
brightnessctl
ufw
docker
docker-compose
mise

# ── GUI apps ──
obsidian
gimp
mpv
obs-studio
dolphin
dolphin-plugins
kdeconnect

# ── Fonts ──
ttf-jetbrains-mono-nerd
noto-fonts
noto-fonts-emoji
noto-fonts-cjk

# ── System ──
power-profiles-daemon
polkit-gnome
gnome-keyring
libsecret
avahi
iwd
wireplumber
xdg-desktop-portal-hyprland
xdg-desktop-portal-gtk
pipewire
pipewire-pulse
cups
networkmanager
networkmanager-openvpn
wireguard-tools
trash-cli
PKGS

  # ── airootfs overlay ──────────────────────────────────────────────────

  AIROOTFS="$PROFILE_DIR/airootfs"
  mkdir -p "$AIROOTFS/etc/skel"
  mkdir -p "$AIROOTFS/usr/local/share/flux"
  mkdir -p "$AIROOTFS/etc/flux"

  # Copy Flux system files into ISO
  cp -r bin/ "$AIROOTFS/usr/local/bin/"
  cp -r default/ "$AIROOTFS/usr/local/share/flux/default/"
  cp -r themes/ "$AIROOTFS/usr/local/share/flux/themes/"
  cp -r config/ "$AIROOTFS/usr/local/share/flux/config/"
  cp -r install/ "$AIROOTFS/usr/local/share/flux/install/"
  cp -r flux-onboarding/ "$AIROOTFS/usr/local/share/flux/flux-onboarding/" 2>/dev/null || true
  cp -r flux-settings/ "$AIROOTFS/usr/local/share/flux/flux-settings/" 2>/dev/null || true
  cp -r flux-installer/ "$AIROOTFS/usr/local/share/flux/flux-installer/" 2>/dev/null || true
  cp -r flux-assistant/ "$AIROOTFS/usr/local/share/flux/flux-assistant/" 2>/dev/null || true
  cp logo.svg "$AIROOTFS/usr/local/share/flux/logo.svg"
  cp version "$AIROOTFS/usr/local/share/flux/version"

  # ── SDDM config ───────────────────────────────────────────────────────

  mkdir -p "$AIROOTFS/etc/sddm.conf.d"
  cat > "$AIROOTFS/etc/sddm.conf.d/flux.conf" << 'EOF'
[Theme]
Current=flux

[Autologin]
Relogin=false
EOF

  # ── systemd services ──────────────────────────────────────────────────

  mkdir -p "$AIROOTFS/etc/systemd/system/multi-user.target.wants"

  # Enable NetworkManager
  ln -sf /usr/lib/systemd/system/NetworkManager.service \
    "$AIROOTFS/etc/systemd/system/multi-user.target.wants/NetworkManager.service"

  # Enable SDDM
  ln -sf /usr/lib/systemd/system/sddm.service \
    "$AIROOTFS/etc/systemd/system/display-manager.service"

  # Enable Docker
  ln -sf /usr/lib/systemd/system/docker.service \
    "$AIROOTFS/etc/systemd/system/multi-user.target.wants/docker.service"

  # Enable Avahi (mDNS)
  ln -sf /usr/lib/systemd/system/avahi-daemon.service \
    "$AIROOTFS/etc/systemd/system/multi-user.target.wants/avahi-daemon.service"

  # Enable ufw firewall
  ln -sf /usr/lib/systemd/system/ufw.service \
    "$AIROOTFS/etc/systemd/system/multi-user.target.wants/ufw.service"

  # ── Hyprland session ─────────────────────────────────────────────────

  mkdir -p "$AIROOTFS/usr/share/wayland-sessions"
  cat > "$AIROOTFS/usr/share/wayland-sessions/flux.desktop" << 'EOF'
[Desktop Entry]
Name=Flux
Comment=Flux OS — Linux for the AI age
Exec=uwsm start hyprland.desktop
Type=Application
EOF

  # ── Flux first-run onboarding trigger ────────────────────────────────

  mkdir -p "$AIROOTFS/etc/profile.d"
  cat > "$AIROOTFS/etc/profile.d/flux-firstrun.sh" << 'EOF'
#!/bin/sh
# Trigger Flux onboarding on first login if not complete
if [ -z "$DISPLAY" ] && [ -z "$WAYLAND_DISPLAY" ]; then
  if [ ! -f "$HOME/.config/flux/setup-complete" ]; then
    exec flux-first-run-onboarding
  fi
fi
EOF

  # ── ISO branding ──────────────────────────────────────────────────────

  cat > "$PROFILE_DIR/profiledef.sh" << EOF
#!/usr/bin/env bash
iso_name="flux"
iso_label="FLUX_$(date +%Y%m)"
iso_publisher="Flux OS <https://github.com/Kikobuf/flux-os>"
iso_application="Flux OS — Linux for the AI age"
iso_version="${FLUX_VERSION}"
install_dir="arch"
buildmodes=('iso')
bootmodes=('bios.syslinux.mbr' 'bios.syslinux.eltorito' 'uefi-x64.systemd-boot.esp' 'uefi-x64.systemd-boot.eltorito')
arch="x86_64"
pacman_conf="pacman.conf"
airootfs_image_type="squashfs"
airootfs_image_tool_options=('-comp' 'xz' '-Xbcj' 'x86' '-b' '1M' '-Xdict-size' '1M')
bootstrap_tarball_compression=('zstd' '-c' '-T0' '--ultra' '-20' '--long')
file_permissions=(
  ["/etc/shadow"]="0:0:400"
  ["/usr/local/bin"]="0:0:755"
)
EOF

  success "ISO profile built"
}

# ── Build ISO ──────────────────────────────────────────────────────────────

build_iso() {
  info "Building ISO (this takes 10-20 minutes)..."

  mkdir -p "$WORK_DIR" "$OUT_DIR"

  mkarchiso \
    -v \
    -w "$WORK_DIR" \
    -o "$OUT_DIR" \
    "$PROFILE_DIR"

  # Rename to Flux branding
  if [ -f "$OUT_DIR/arch-$(date +%Y.%m.%d)-x86_64.iso" ]; then
    mv "$OUT_DIR/arch-$(date +%Y.%m.%d)-x86_64.iso" "$OUT_DIR/$ISO_NAME"
  fi

  success "ISO built: $OUT_DIR/$ISO_NAME"
  echo ""
  echo "  Size: $(du -sh "$OUT_DIR/$ISO_NAME" | cut -f1)"
  echo "  SHA256: $(sha256sum "$OUT_DIR/$ISO_NAME" | cut -d' ' -f1)"
}

# ── Write to USB ───────────────────────────────────────────────────────────

write_usb() {
  echo ""
  echo "To write to USB:"
  echo "  sudo dd if=$OUT_DIR/$ISO_NAME of=/dev/sdX bs=4M status=progress"
  echo "  (replace /dev/sdX with your USB device)"
  echo ""
  echo "Or use balenaEtcher on Windows/macOS."
}

# ── Main ──────────────────────────────────────────────────────────────────

case "${1:-}" in
  --clean)
    info "Cleaning build directories..."
    rm -rf "$PROFILE_DIR" "$WORK_DIR"
    success "Cleaned"
    exit 0
    ;;
  --fast)
    build_profile
    build_iso
    write_usb
    ;;
  *)
    preflight
    build_profile
    build_iso
    write_usb
    ;;
esac
