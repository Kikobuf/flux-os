# Overwrite parts of the flux-menu with user-specific submenus.
# See $FLUX_PATH/bin/flux-menu for functions that can be overwritten.
#
# WARNING: Overwritten functions will obviously not be updated when Flux changes.
#
# Example of minimal system menu:
#
# show_system_menu() {
#   case $(menu "System" "  Lock\n󰐥  Shutdown") in
#   *Lock*) flux-system-lock ;;
#   *Shutdown*) flux-system-shutdown ;;
#   *) back_to show_main_menu ;;
#   esac
# }
#
# Example of overriding just the about menu action: (Using zsh instead of bash (default))
#
# show_about() {
#   exec flux-launch-or-focus-tui "zsh -c 'fastfetch; read -k 1'"
# }
