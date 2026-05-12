echo "Uniquely identify terminal apps with custom app-ids using flux-launch-tui"

# Replace terminal -e calls with flux-launch-tui in bindings
sed -i 's/\$terminal -e \([^ ]*\)/flux-launch-tui \1/g' ~/.config/hypr/bindings.conf

# Update waybar to use flux-launch-or-focus with flux-launch-tui for TUI apps
sed -i 's|xdg-terminal-exec btop|flux-launch-or-focus-tui btop|' ~/.config/waybar/config.jsonc
sed -i 's|xdg-terminal-exec --app-id=com\.flux\.Wiremix -e wiremix|flux-launch-or-focus-tui wiremix|' ~/.config/waybar/config.jsonc
