echo "Raise soft file descriptor limit so dev tools have headroom (takes effect after reboot)"

bash $FLUX_PATH/install/config/increase-fd-limit.sh
