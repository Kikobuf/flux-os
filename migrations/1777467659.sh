echo "Rename lock screen command in Hypridle config"

if grep -q 'flux-lock-screen' ~/.config/hypr/hypridle.conf; then
  sed -i 's/flux-lock-screen/flux-system-lock/g' ~/.config/hypr/hypridle.conf
  flux-restart-hypridle
fi
