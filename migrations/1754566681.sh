echo "Make new Osaka Jade theme available as new default"

if [[ ! -L ~/.config/flux/themes/osaka-jade ]]; then
  rm -rf ~/.config/flux/themes/osaka-jade
  git -C ~/.local/share/flux checkout -f themes/osaka-jade
  ln -nfs ~/.local/share/flux/themes/osaka-jade ~/.config/flux/themes/osaka-jade
fi
