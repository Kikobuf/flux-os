echo "Switch lmstudio -> lmstudio-bin"

if pacman -Q lmstudio &>/dev/null; then
  flux-pkg-drop lmstudio
  flux-pkg-add lmstudio-bin
fi
