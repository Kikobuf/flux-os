echo "Change to flux-nvim package"
flux-pkg-drop flux-lazyvim
flux-pkg-add flux-nvim

# Will trigger to overwrite configs or not to pickup new hot-reload themes
flux-nvim-setup
