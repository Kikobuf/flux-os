echo "Rename screen recording command"

WAYBAR_CONFIG="$HOME/.config/waybar/config.jsonc"

if [[ -f $WAYBAR_CONFIG ]] && grep -q 'flux-capture-screencording' "$WAYBAR_CONFIG"; then
  sed -i 's/flux-capture-screencording/flux-capture-screenrecording/g' "$WAYBAR_CONFIG"
  flux-restart-waybar
fi
