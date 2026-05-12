echo "Replace buggy native Zoom client with webapp"

if flux-pkg-present zoom; then
  flux-pkg-drop zoom
  flux-webapp-install "Zoom" https://app.zoom.us/wc/home https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/zoom.png
fi
