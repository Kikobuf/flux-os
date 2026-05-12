echo "Add opencode with system theming"

flux-pkg-add opencode

# Add config using flux theme by default
if [[ ! -f ~/.config/opencode/opencode.json ]]; then
  mkdir -p ~/.config/opencode
  cp $FLUX_PATH/config/opencode/opencode.json ~/.config/opencode/opencode.json
fi
