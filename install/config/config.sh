# Copy over Flux configs
mkdir -p ~/.config
cp -R ~/.local/share/flux/config/* ~/.config/

# Use default bashrc from Flux
cp ~/.local/share/flux/default/bashrc ~/.bashrc
