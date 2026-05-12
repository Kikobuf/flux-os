echo "Change flux-screenrecord to use gpu-screen-recorder"
flux-pkg-drop wf-recorder wl-screenrec

# Add slurp in case it hadn't been picked up from an old migration
flux-pkg-add slurp gpu-screen-recorder
