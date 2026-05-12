echo "Add right-click terminal action to waybar flux menu icon"

WAYBAR_CONFIG="$HOME/.config/waybar/config.jsonc"

if [[ -f $WAYBAR_CONFIG ]] && ! grep -A5 '"custom/flux"' "$WAYBAR_CONFIG" | grep -q '"on-click-right"'; then
  sed -i '/"on-click": "flux-menu",/a\    "on-click-right": "flux-launch-terminal",' "$WAYBAR_CONFIG"
fi
