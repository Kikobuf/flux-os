source $FLUX_INSTALL/preflight/guard.sh
source $FLUX_INSTALL/preflight/begin.sh
run_logged $FLUX_INSTALL/preflight/show-env.sh
run_logged $FLUX_INSTALL/preflight/pacman.sh
run_logged $FLUX_INSTALL/preflight/migrations.sh
run_logged $FLUX_INSTALL/preflight/first-run-mode.sh
run_logged $FLUX_INSTALL/preflight/disable-mkinitcpio.sh
