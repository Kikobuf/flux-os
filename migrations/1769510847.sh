echo "Switch back to mainline chromium now that it supports full live theming"

if flux-pkg-present flux-chromium; then
  if gum confirm "Ready to switch to mainstream chromium? (Will close Chromium + reset settings)"; then
    pkill -x chromium
    flux-pkg-drop flux-chromium
    flux-pkg-add chromium
    flux-theme-set-browser
  fi
fi
