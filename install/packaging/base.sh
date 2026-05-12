# Install all base packages
mapfile -t packages < <(grep -v '^#' "$FLUX_INSTALL/flux-base.packages" | grep -v '^$')
flux-pkg-add "${packages[@]}"
