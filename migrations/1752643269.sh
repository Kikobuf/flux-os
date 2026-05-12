echo "Add new matte black theme"

if [[ ! -L $HOME/.config/flux/themes/matte-black ]]; then
  ln -snf ~/.local/share/flux/themes/matte-black ~/.config/flux/themes/
fi
