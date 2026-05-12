echo "Use interactive background selector menu"

mkdir -p ~/.config/elephant/menus
ln -snf $FLUX_PATH/default/elephant/flux_background_selector.lua ~/.config/elephant/menus/flux_background_selector.lua
flux-restart-walker
