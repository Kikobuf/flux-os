echo "Allow updating of timezone by right-clicking on the clock (or running flux-cmd-tzupdate)"

if flux-cmd-missing tzupdate; then
  bash "$FLUX_PATH/install/config/timezones.sh"
  flux-refresh-waybar
fi
