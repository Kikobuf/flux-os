echo "Add sample low battery notification hook"

mkdir -p ~/.config/flux/hooks/battery-low.d

if [[ ! -f ~/.config/flux/hooks/battery-low.d/play-warning-sound.sample ]]; then
  cp "$FLUX_PATH/config/flux/hooks/battery-low.d/play-warning-sound.sample" ~/.config/flux/hooks/battery-low.d/play-warning-sound.sample
fi
