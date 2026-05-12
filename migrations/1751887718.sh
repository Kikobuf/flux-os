echo "Install Impala as new wifi selection TUI"

if flux-cmd-missing impala; then
  flux-pkg-add impala
  flux-refresh-waybar
fi
