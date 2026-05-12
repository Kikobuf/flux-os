echo "Use interactive unlock (Plymouth) selector menu"

mkdir -p ~/.config/elephant/menus
ln -snf $FLUX_PATH/default/elephant/flux_unlocks.lua ~/.config/elephant/menus/flux_unlocks.lua
flux-restart-walker
