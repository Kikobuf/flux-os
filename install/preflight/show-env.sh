# Show installation environment variables
gum log --level info "Installation Environment:"

env | grep -E "^(FLUX_CHROOT_INSTALL|FLUX_ONLINE_INSTALL|FLUX_USER_NAME|FLUX_USER_EMAIL|USER|HOME|FLUX_REPO|FLUX_REF|FLUX_PATH)=" | sort | while IFS= read -r var; do
  gum log --level info "  $var"
done
