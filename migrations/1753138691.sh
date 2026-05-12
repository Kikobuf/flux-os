echo "Install swayOSD to show volume status"

if flux-cmd-missing swayosd-server; then
  flux-pkg-add swayosd
  setsid uwsm-app -- swayosd-server &>/dev/null &
fi
