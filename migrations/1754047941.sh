echo "Add icon theme coloring"

if ! pacman -Q yaru-icon-theme &>/dev/null; then
  sudo pacman -S --noconfirm yaru-icon-theme

  if [[ -f ~/.config/flux/current/theme/icons.theme ]]; then
    gsettings set org.gnome.desktop.interface icon-theme "$(<~/.config/flux/current/theme/icons.theme)"
  fi
fi
