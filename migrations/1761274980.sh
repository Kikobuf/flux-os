echo "Migrate to proper packages for localsend and asdcontrol"

if flux-pkg-present localsend-bin; then
  flux-pkg-drop localsend-bin
  flux-pkg-add localsend
fi

if flux-pkg-present asdcontrol-git; then
  flux-pkg-drop asdcontrol-git
  flux-pkg-add asdcontrol
fi
