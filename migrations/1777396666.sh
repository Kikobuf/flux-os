echo "Use Flux UWSM session without graphical.target startup wait"

sudo mkdir -p /usr/local/share/wayland-sessions
sudo cp "$FLUX_PATH/default/wayland-sessions/flux.desktop" /usr/local/share/wayland-sessions/flux.desktop

if [[ -f /etc/sddm.conf.d/autologin.conf ]]; then
  sudo sed -i 's/^Session=hyprland-uwsm$/Session=flux/' /etc/sddm.conf.d/autologin.conf
fi
