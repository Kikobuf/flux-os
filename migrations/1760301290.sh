echo "Add the new Flexoki Light theme"

if [[ ! -L ~/.config/flux/themes/flexoki-light ]]; then
  ln -nfs ~/.local/share/flux/themes/flexoki-light ~/.config/flux/themes/
fi
