echo "Copy Fcitx5 autostart desktop file to ~/.config/autostart"

mkdir -p ~/.config/autostart/
cp "$FLUX_PATH/config/autostart/org.fcitx.Fcitx5.desktop" ~/.config/autostart/

flux-restart-xcompose
