echo "Make ethereal available as new theme"

if [[ ! -L ~/.config/flux/themes/ethereal ]]; then
  rm -rf ~/.config/flux/themes/ethereal
  ln -nfs ~/.local/share/flux/themes/ethereal ~/.config/flux/themes/
fi
