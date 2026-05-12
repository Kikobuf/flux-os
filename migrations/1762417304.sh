echo "Replace bluetooth GUI with TUI"

flux-pkg-add bluetui
flux-pkg-drop blueberry

if ! grep -q "flux-launch-bluetooth" ~/.config/waybar/config.jsonc; then
  sed -i 's/blueberry/flux-launch-bluetooth/' ~/.config/waybar/config.jsonc
fi
