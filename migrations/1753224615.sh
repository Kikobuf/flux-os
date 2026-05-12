echo "Adding SwayOSD theming"

if [[ ! -d ~/.config/swayosd ]]; then
  mkdir -p ~/.config/swayosd
  cp -r ~/.local/share/flux/config/swayosd/* ~/.config/swayosd/

  pkill swayosd-server
  setsid uwsm-app -- swayosd-server &>/dev/null &
fi
