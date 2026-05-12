echo "Update fastfetch config with new Flux logo"

flux-refresh-config fastfetch/config.jsonc

mkdir -p ~/.config/flux/branding
cp $FLUX_PATH/icon.txt ~/.config/flux/branding/about.txt
