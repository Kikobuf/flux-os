hl.on("hyprland.start", function()
  hl.exec_cmd("uwsm-app -- hypridle")
  hl.exec_cmd("uwsm-app -- mako")
  hl.exec_cmd("! flux-toggle-enabled waybar-off && uwsm-app -- waybar")
  hl.exec_cmd("uwsm-app -- fcitx5 --disable notificationitem")
  hl.exec_cmd("uwsm-app -- swaybg -i ~/.config/flux/current/background -m fill")
  hl.exec_cmd("/usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1")
  hl.exec_cmd("flux-first-run")
  hl.exec_cmd("flux-powerprofiles-init")
  hl.exec_cmd("uwsm-app -- flux-hyprland-monitor-watch")

  -- Slow app launch fix -- set systemd vars.
  hl.exec_cmd("systemctl --user import-environment $(env | cut -d'=' -f 1)")
  hl.exec_cmd("dbus-update-activation-environment --systemd --all")

  -- Run post-boot hooks after startup config has loaded.
  hl.exec_cmd("sleep 2 && flux-hook post-boot")
end)

  -- Flux Phase 2: Load gestures
  hl.exec_cmd("hyprctl keyword gestures:workspace_swipe true")
  hl.exec_cmd("hyprctl keyword gestures:workspace_swipe_fingers 3")
