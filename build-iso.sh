#!/bin/bash
# build-iso.sh — Flux OS ISO builder
# Run on any Arch Linux machine: sudo ./build-iso.sh
#
# Usage:
#   sudo ./build-iso.sh           # full build
#   sudo ./build-iso.sh --fast    # skip package sync
#   sudo ./build-iso.sh --clean   # clean build dirs

set -euo pipefail

FLUX_VERSION=$(cat version 2>/dev/null || echo "0.1.0")
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROFILE_DIR="/tmp/flux-iso-profile"
WORK_DIR="/tmp/flux-iso-work"
OUT_DIR="${SCRIPT_DIR}/out"
ISO_NAME="flux-${FLUX_VERSION}-x86_64.iso"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
info()    { echo -e "${BLUE}→${NC} $*"; }
success() { echo -e "${GREEN}✓${NC} $*"; }
warn()    { echo -e "${YELLOW}⚠${NC} $*"; }
error()   { echo -e "${RED}✗${NC} $*"; exit 1; }

header() {
  echo ""
  echo -e "${GREEN}███████╗██╗     ██╗   ██╗██╗  ██╗${NC}"
  echo -e "${GREEN}██╔════╝██║     ██║   ██║╚██╗██╔╝${NC}"
  echo -e "${GREEN}█████╗  ██║     ██║   ██║ ╚███╔╝ ${NC}"
  echo -e "${GREEN}██╔══╝  ██║     ██║   ██║ ██╔██╗ ${NC}"
  echo -e "${GREEN}██║     ███████╗╚██████╔╝██╔╝ ██╗${NC}"
  echo -e "${GREEN}╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝${NC}"
  echo ""
  echo "  ISO Builder v${FLUX_VERSION}"
  echo ""
}

# ── Preflight ──────────────────────────────────────────────────────────────

preflight() {
  [ "$EUID" -eq 0 ] || error "Run as root: sudo ./build-iso.sh"

  info "Checking dependencies..."
  for pkg in archiso squashfs-tools libisoburn; do
    if ! pacman -Qi "$pkg" &>/dev/null; then
      info "Installing $pkg..."
      pacman -S --noconfirm "$pkg"
    fi
  done
  success "Dependencies ready"
}

# ── Profile setup ──────────────────────────────────────────────────────────

build_profile() {
  info "Building ISO profile..."

  rm -rf "$PROFILE_DIR"
  # enable multilib for 32-bit packages
  cp -r /usr/share/archiso/configs/releng/ "$PROFILE_DIR"

  # Enable multilib repo for 32-bit packages
  sed -i '/^#[multilib]/{n;s/^#//;s/^#//}' "$PROFILE_DIR/pacman.conf" || true
  sed -i 's/^#[multilib]/[multilib]/' "$PROFILE_DIR/pacman.conf" || true

  # ── Package list ───────────────────────────────────────────────────────

  cat >> "$PROFILE_DIR/packages.x86_64" << 'PKGS'

# Flux desktop
hyprland
hyprlock
hypridle
hyprpicker
hyprsunset
uwsm
waybar
mako
swaybg
swayosd
sddm
qt6-declarative
alacritty
tmux
zsh
zsh-completions

# Display & GPU
mesa
lib32-mesa
vulkan-radeon
vulkan-intel
intel-media-driver
egl-wayland

# Core utilities
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
trash-cli
jq
curl
wget
unzip

# File management
dolphin
dolphin-plugins
ffmpegthumbs

# System
ufw
docker
docker-compose
networkmanager
networkmanager-openvpn
wireguard-tools
power-profiles-daemon
polkit-gnome
gnome-keyring
libsecret
avahi
iwd
wireplumber
pipewire
pipewire-pulse
xdg-desktop-portal-hyprland
xdg-desktop-portal-gtk
cups
mise

# Fonts
ttf-jetbrains-mono-nerd
noto-fonts
noto-fonts-emoji
noto-fonts-cjk
woff2

# GUI Apps
# obsidian  # AUR - installed post-boot
gimp
mpv
obs-studio
kdeconnect
# localsend  # AUR - installed post-boot

# Security
ufw
# bitwarden  # AUR - installed post-boot

# Dev tools
github-cli
python
python-pip
nodejs
npm

# AI
ollama
PKGS

  # ── profiledef.sh ─────────────────────────────────────────────────────

  cat > "$PROFILE_DIR/profiledef.sh" << PROFILEEOF
#!/usr/bin/env bash
iso_name="flux"
iso_label="FLUX_$(date +%Y%m)"
iso_publisher="Flux OS <https://github.com/Kikobuf/flux-os>"
iso_application="Flux OS ${FLUX_VERSION} — Linux for the AI age"
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
  ["/usr/local/bin/flux-*"]="0:0:755"
)
PROFILEEOF

  # ── airootfs overlay ──────────────────────────────────────────────────

  ROOTFS="$PROFILE_DIR/airootfs"
  mkdir -p \
    "$ROOTFS/usr/local/share/flux" \
    "$ROOTFS/usr/local/bin" \
    "$ROOTFS/etc/sddm.conf.d" \
    "$ROOTFS/etc/systemd/system/multi-user.target.wants" \
    "$ROOTFS/usr/share/wayland-sessions" \
    "$ROOTFS/usr/share/plymouth/themes/flux" \
    "$ROOTFS/usr/share/sddm/themes/flux"

  # Copy Flux files
  info "Copying Flux files into airootfs..."
  cp -r "${SCRIPT_DIR}/bin/"*          "$ROOTFS/usr/local/bin/"
  cp -r "${SCRIPT_DIR}/default/"       "$ROOTFS/usr/local/share/flux/default/"
  cp -r "${SCRIPT_DIR}/themes/"        "$ROOTFS/usr/local/share/flux/themes/"
  cp -r "${SCRIPT_DIR}/config/"        "$ROOTFS/usr/local/share/flux/config/"
  cp -r "${SCRIPT_DIR}/install/"       "$ROOTFS/usr/local/share/flux/install/"
  cp    "${SCRIPT_DIR}/logo.svg"       "$ROOTFS/usr/local/share/flux/logo.svg"
  cp    "${SCRIPT_DIR}/icon.png"       "$ROOTFS/usr/local/share/flux/icon.png"
  cp    "${SCRIPT_DIR}/version"        "$ROOTFS/usr/local/share/flux/version"
  cp    "${SCRIPT_DIR}/icon.txt"       "$ROOTFS/usr/local/share/flux/icon.txt"

  # Copy React apps if built
  for app in flux-onboarding flux-settings flux-installer flux-assistant; do
    if [ -d "${SCRIPT_DIR}/${app}" ]; then
      cp -r "${SCRIPT_DIR}/${app}/" "$ROOTFS/usr/local/share/flux/${app}/"
    fi
  done

  # Copy logo assets
  if [ -d "${SCRIPT_DIR}/assets/logos" ]; then
    cp -r "${SCRIPT_DIR}/assets/" "$ROOTFS/usr/local/share/flux/assets/"
  fi

  find "$ROOTFS/usr/local/bin/" -type f -exec chmod 755 {} + 2>/dev/null || true

  # ── SDDM ──────────────────────────────────────────────────────────────

  mkdir -p "$ROOTFS/etc/sddm.conf.d"
  cat > "$ROOTFS/etc/sddm.conf.d/flux.conf" << 'EOF'
[Theme]
Current=flux

[General]
HaltCommand=/usr/bin/systemctl poweroff
RebootCommand=/usr/bin/systemctl reboot
EOF

  # Copy SDDM theme
  cp -r "${SCRIPT_DIR}/default/sddm/omarchy/"* "$ROOTFS/usr/share/sddm/themes/flux/"
  cp "${SCRIPT_DIR}/assets/logos/flux-icon-256.png" \
     "$ROOTFS/usr/share/sddm/themes/flux/logo.png" 2>/dev/null || true

  # ── Plymouth boot splash ───────────────────────────────────────────────

  cp "${SCRIPT_DIR}/default/plymouth/flux.plymouth" \
     "$ROOTFS/usr/share/plymouth/themes/flux/flux.plymouth"
  cp "${SCRIPT_DIR}/default/plymouth/"*.png \
     "$ROOTFS/usr/share/plymouth/themes/flux/" 2>/dev/null || true
  cp "${SCRIPT_DIR}/assets/logos/flux-icon-256.png" \
     "$ROOTFS/usr/share/plymouth/themes/flux/logo.png" 2>/dev/null || true

  # Plymouth script (reuse Omarchy's with name change)
  if [ -f "${SCRIPT_DIR}/default/plymouth/flux.script" ]; then
    cp "${SCRIPT_DIR}/default/plymouth/flux.script" \
       "$ROOTFS/usr/share/plymouth/themes/flux/flux.script"
  fi

  # ── Wayland session ───────────────────────────────────────────────────

  mkdir -p "$ROOTFS/usr/share/wayland-sessions"
  cat > "$ROOTFS/usr/share/wayland-sessions/flux.desktop" << 'EOF'
[Desktop Entry]
Name=Flux
Comment=Flux OS — Linux for the AI age
Exec=uwsm start hyprland.desktop
Type=Application
DesktopNames=Hyprland
EOF

  # ── systemd services ──────────────────────────────────────────────────

  for svc in NetworkManager docker avahi-daemon ufw cups ollama; do
    SVC_FILE="/usr/lib/systemd/system/${svc}.service"
    if [ -f "$SVC_FILE" ]; then
      ln -sf "$SVC_FILE" \
        "$ROOTFS/etc/systemd/system/multi-user.target.wants/${svc}.service"
    fi
  done

  # SDDM as display manager
  ln -sf /usr/lib/systemd/system/sddm.service \
    "$ROOTFS/etc/systemd/system/display-manager.service"

  # ── Flux environment ──────────────────────────────────────────────────

  mkdir -p "$ROOTFS/etc/profile.d"
  cat > "$ROOTFS/etc/profile.d/flux.sh" << 'EOF'
#!/bin/sh
export FLUX_PATH="/usr/local/share/flux"
export PATH="$FLUX_PATH/bin:/usr/local/bin:$PATH"

# Trigger onboarding on first login
if [ -n "$DISPLAY" ] || [ -n "$WAYLAND_DISPLAY" ]; then
  if [ ! -f "$HOME/.config/flux/setup-complete" ]; then
    flux-first-run-onboarding &
  fi
fi
EOF

  # ── Default shell (zsh) ───────────────────────────────────────────────

  mkdir -p "$ROOTFS/etc/skel"
  cat > "$ROOTFS/etc/skel/.zshrc" << 'EOF'
# Flux default zshrc
export FLUX_PATH="/usr/local/share/flux"
export PATH="$FLUX_PATH/bin:$PATH"

# Source Flux shell config
[ -f "$FLUX_PATH/default/bash/rc" ] && source "$FLUX_PATH/default/bash/rc"

# Aliases
alias c="opencode"
alias cx="claude --dangerously-skip-permissions"
alias ls="eza --icons"
alias ll="eza -la --icons"
alias cat="bat"
alias cd="z"

# Starship prompt
eval "$(starship init zsh)"
eval "$(zoxide init zsh)"
EOF

  success "ISO profile ready"
}

# ── Build ISO ──────────────────────────────────────────────────────────────

build_iso() {
  info "Building ISO — this takes 15-30 minutes..."
  mkdir -p "$OUT_DIR"

  mkarchiso -v -w "$WORK_DIR" -o "$OUT_DIR" "$PROFILE_DIR"

  # Find and rename output
  BUILT=$(find "$OUT_DIR" -name "*.iso" | head -1)
  if [ -n "$BUILT" ] && [ "$BUILT" != "$OUT_DIR/$ISO_NAME" ]; then
    mv "$BUILT" "$OUT_DIR/$ISO_NAME"
  fi

  success "ISO built!"
  echo ""
  echo "  📦 File:   $OUT_DIR/$ISO_NAME"
  echo "  📏 Size:   $(du -sh "$OUT_DIR/$ISO_NAME" | cut -f1)"
  echo "  🔒 SHA256: $(sha256sum "$OUT_DIR/$ISO_NAME" | cut -d' ' -f1)"
  echo ""
  echo "Write to USB:"
  echo "  sudo dd if=$OUT_DIR/$ISO_NAME of=/dev/sdX bs=4M status=progress"
  echo "  (or use balenaEtcher on Windows/macOS)"
}

# ── Main ──────────────────────────────────────────────────────────────────

header

case "${1:-build}" in
  --clean)
    info "Cleaning build directories..."
    rm -rf "$PROFILE_DIR"
  # enable multilib for 32-bit packages "$WORK_DIR"
    success "Cleaned"
    ;;
  --fast)
    build_profile
    build_iso
    ;;
  build|*)
    preflight
    build_profile
    build_iso
    ;;
esac
