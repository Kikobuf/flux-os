echo "Move Flux Package Repository after Arch core/extra/multilib and remove AUR"

flux-refresh-pacman
sudo pacman -Syu --noconfirm
