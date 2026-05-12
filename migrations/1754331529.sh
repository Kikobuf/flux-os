echo "Update Waybar for new Flux menu"

if ! grep -q "" ~/.config/waybar/config.jsonc; then
  flux-refresh-waybar
fi
