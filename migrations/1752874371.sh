echo "Add Catppuccin Latte light theme"

if [[ ! -L $HOME/.config/flux/themes/catppuccin-latte ]]; then
  ln -snf ~/.local/share/flux/themes/catppuccin-latte ~/.config/flux/themes/
fi
