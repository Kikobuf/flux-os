echo "Add Tmux as an option with themed styling"

flux-pkg-add tmux

if [[ ! -f ~/.config/tmux/tmux.conf ]]; then
  mkdir -p ~/.config/tmux
  cp $FLUX_PATH/config/tmux/tmux.conf ~/.config/tmux/tmux.conf
  flux-theme-refresh
fi
