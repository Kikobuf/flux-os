echo "Replace Waybar flux-launch-or-focus-tui wiremix with flux-launch-audio"

sed -i 's/flux-launch-or-focus-tui wiremix/flux-launch-audio/g' ~/.config/waybar/config.jsonc
