echo "Show battery status notification on right-click of the waybar battery icon"

if ! grep -q 'flux-battery-status' ~/.config/waybar/config.jsonc; then
  sed -i '/"on-click": "flux-menu power",/a\    "on-click-right": "notify-send -u low \\"$(flux-battery-status)\\"",' ~/.config/waybar/config.jsonc
  flux-restart-waybar
fi
