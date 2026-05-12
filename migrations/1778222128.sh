echo "Add sample post-boot hook"

mkdir -p ~/.config/flux/hooks/post-boot.d

if [[ ! -f ~/.config/flux/hooks/post-boot.d/weather.sample ]]; then
  cp "$FLUX_PATH/config/flux/hooks/post-boot.d/weather.sample" ~/.config/flux/hooks/post-boot.d/weather.sample
fi
