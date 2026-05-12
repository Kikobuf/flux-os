if [[ $(plymouth-set-default-theme) != "flux" ]]; then
  sudo cp -r "$HOME/.local/share/flux/default/plymouth" /usr/share/plymouth/themes/flux/
  sudo plymouth-set-default-theme flux
fi
