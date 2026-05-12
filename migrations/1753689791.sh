echo "Add the new ristretto theme as an option"

if [[ ! -L ~/.config/flux/themes/ristretto ]]; then
  ln -nfs ~/.local/share/flux/themes/ristretto ~/.config/flux/themes/
fi
