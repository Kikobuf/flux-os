echo "Update Waybar screen recording command"

WAYBAR_CONFIG="$HOME/.config/waybar/config.jsonc"

if [[ -f $WAYBAR_CONFIG ]] && grep -q 'flux-cmd-screenrecord' "$WAYBAR_CONFIG"; then
  sed -i 's/flux-cmd-screenrecord/flux-capture-screenrecording/g' "$WAYBAR_CONFIG"
  flux-restart-waybar
fi
