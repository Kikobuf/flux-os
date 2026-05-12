echo "Link new theme picker config"

mkdir -p ~/.config/elephant/menus
ln -snf $FLUX_PATH/default/elephant/flux_themes.lua ~/.config/elephant/menus/flux_themes.lua
sed -i '/"menus",/d' ~/.config/walker/config.toml
flux-restart-walker
