#!/bin/bash
# Flux GPU auto-detection

echo "  → Detecting GPU..."
GPU_INFO=$(lspci | grep -iE "vga|3d|display" || true)

install_nvidia() {
  echo "  → NVIDIA GPU detected. Installing drivers + Hyprland fixes..."
  flux-pkg-add nvidia nvidia-utils nvidia-settings lib32-nvidia-utils egl-wayland

  # Enable DRM modeset (required for Hyprland)
  if [ -f /etc/default/grub ]; then
    sudo sed -i 's/\(GRUB_CMDLINE_LINUX_DEFAULT="[^"]*\)"/\1 nvidia_drm.modeset=1 nvidia_drm.fbdev=1"/' /etc/default/grub
    sudo grub-mkconfig -o /boot/grub/grub.cfg 2>/dev/null || true
  fi

  # Add nvidia modules to initramfs
  if ! grep -q "nvidia" /etc/mkinitcpio.conf; then
    sudo sed -i 's/^MODULES=(\(.*\))/MODULES=(\1 nvidia nvidia_modeset nvidia_uvm nvidia_drm)/' /etc/mkinitcpio.conf
    sudo mkinitcpio -P
  fi

  # Write Hyprland NVIDIA env fixes
  mkdir -p ~/.config/hypr
  cat >> ~/.config/hypr/nvidia.conf << 'NVCONF'
# Flux NVIDIA compatibility fixes
env = LIBVA_DRIVER_NAME,nvidia
env = XDG_SESSION_TYPE,wayland
env = GBM_BACKEND,nvidia-drm
env = __GLX_VENDOR_LIBRARY_NAME,nvidia
cursor {
  no_hardware_cursors = true
}
NVCONF
  echo "  ✓ NVIDIA drivers installed"
}

install_amd() {
  echo "  → AMD GPU detected. Installing drivers..."
  flux-pkg-add mesa lib32-mesa xf86-video-amdgpu vulkan-radeon lib32-vulkan-radeon libva-mesa-driver
  echo "  ✓ AMD drivers installed"
}

install_intel() {
  echo "  → Intel GPU detected. Installing drivers..."
  flux-pkg-add mesa lib32-mesa intel-media-driver vulkan-intel lib32-vulkan-intel
  echo "  ✓ Intel drivers installed"
}

if echo "$GPU_INFO" | grep -iq "nvidia"; then
  install_nvidia
elif echo "$GPU_INFO" | grep -iq "amd\|radeon\|advanced micro"; then
  install_amd
elif echo "$GPU_INFO" | grep -iq "intel"; then
  install_intel
else
  echo "  → No dedicated GPU detected, installing Mesa..."
  flux-pkg-add mesa lib32-mesa
fi
