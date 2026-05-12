#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -eEo pipefail

# Define Flux locations
export FLUX_PATH="$HOME/.local/share/flux"
export FLUX_INSTALL="$FLUX_PATH/install"
export FLUX_INSTALL_LOG_FILE="/var/log/flux-install.log"
export PATH="$FLUX_PATH/bin:$PATH"

# Install
source "$FLUX_INSTALL/helpers/all.sh"
source "$FLUX_INSTALL/preflight/all.sh"
source "$FLUX_INSTALL/packaging/all.sh"
source "$FLUX_INSTALL/config/all.sh"
source "$FLUX_INSTALL/login/all.sh"
source "$FLUX_INSTALL/post-install/all.sh"
