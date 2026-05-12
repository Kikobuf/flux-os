echo "Replace volume control GUI with a TUI"

if flux-cmd-missing wiremix; then
  flux-pkg-add wiremix
  flux-pkg-drop pavucontrol
  flux-refresh-applications
  flux-refresh-waybar
fi
