echo "Add minimal starship prompt to terminal"

if flux-cmd-missing starship; then
  flux-pkg-add starship
  cp $FLUX_PATH/config/starship.toml ~/.config/starship.toml
fi
