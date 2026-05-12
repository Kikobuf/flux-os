echo "Make hackerman available as new theme"

if [[ ! -L ~/.config/flux/themes/hackerman ]]; then
  rm -rf ~/.config/flux/themes/hackerman
  ln -nfs ~/.local/share/flux/themes/hackerman ~/.config/flux/themes/
fi
