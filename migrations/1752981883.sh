echo "Replace wofi with walker as the default launcher"

if flux-cmd-missing walker; then
  flux-pkg-add walker-bin libqalculate

  flux-pkg-drop wofi
  rm -rf ~/.config/wofi

  mkdir -p ~/.config/walker
  cp -r ~/.local/share/flux/config/walker/* ~/.config/walker/
fi
