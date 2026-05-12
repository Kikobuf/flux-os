echo "Install socat so we can reactivate internal display when external display is removed"

flux-pkg-add socat
uwsm-app -- flux-hyprland-monitor-watch &
