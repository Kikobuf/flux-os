#!/bin/bash

FLUX_REPO="https://github.com/Kikobuf/flux-os"
FLUX_DIR="${HOME}/.local/share/flux"

echo ""
echo "███████╗██╗     ██╗   ██╗██╗  ██╗"
echo "██╔════╝██║     ██║   ██║╚██╗██╔╝"
echo "█████╗  ██║     ██║   ██║ ╚███╔╝ "
echo "██╔══╝  ██║     ██║   ██║ ██╔██╗ "
echo "██║     ███████╗╚██████╔╝██╔╝ ██╗"
echo "╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝"
echo ""
echo "Linux, reimagined for the AI age."
echo ""
echo "This will install Flux on your system."
echo "Press ENTER to continue or Ctrl+C to cancel."
read -r

if [ -d "$FLUX_DIR" ]; then
  echo "→ Updating existing Flux installation..."
  git -C "$FLUX_DIR" pull
else
  echo "→ Downloading Flux..."
  git clone "$FLUX_REPO" "$FLUX_DIR"
fi

bash "${FLUX_DIR}/install.sh"
