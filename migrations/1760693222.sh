echo "Use explicit timezone selector when right-clicking on clock"

sed -i 's/flux-cmd-tzupdate/flux-launch-floating-terminal-with-presentation flux-tz-select/g' ~/.config/waybar/config.jsonc
