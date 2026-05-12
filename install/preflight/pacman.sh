if [[ -n ${FLUX_ONLINE_INSTALL:-} ]]; then
  # Install build tools
  flux-pkg-add base-devel

  # Configure pacman
  sudo cp -f ~/.local/share/flux/default/pacman/pacman-${FLUX_MIRROR:-stable}.conf /etc/pacman.conf
  sudo cp -f ~/.local/share/flux/default/pacman/mirrorlist-${FLUX_MIRROR:-stable} /etc/pacman.d/mirrorlist

  sudo pacman-key --recv-keys 40DFB630FF42BCFFB047046CF0134EE680CAC571 --keyserver keys.openpgp.org
  sudo pacman-key --lsign-key 40DFB630FF42BCFFB047046CF0134EE680CAC571

  sudo pacman -Sy
  flux-pkg-add flux-keyring

  # Refresh all repos
  sudo pacman -Syyuu --noconfirm
fi
