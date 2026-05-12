echo "Ensure all indexes and packages are up to date"

flux-update-keyring
flux-refresh-pacman
sudo pacman -Syu --noconfirm
