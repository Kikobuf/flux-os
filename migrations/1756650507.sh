echo "Fix JetBrains font setting"

if [[ $(flux-font-current) == JetBrains* ]]; then
  flux-font-set "JetBrainsMono Nerd Font"
fi
