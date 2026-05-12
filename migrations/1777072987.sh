echo "Fix disable-while-typing on ASUS ROG Flow Z13 detachable keyboard"

source $FLUX_PATH/install/config/hardware/asus/fix-z13-touchpad.sh

if [[ -f /etc/udev/rules.d/99-flux-asus-z13-touchpad.rules ]]; then
  flux-state set reboot-required
fi
