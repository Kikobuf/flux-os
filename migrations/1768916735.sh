echo "Fix microphone gain and audio mixing on Asus ROG laptops"

source "$FLUX_PATH/install/config/hardware/asus/fix-mic.sh"
source "$FLUX_PATH/install/config/hardware/asus/fix-audio-mixer.sh"

if flux-hw-asus-rog; then
  flux-restart-pipewire
fi
