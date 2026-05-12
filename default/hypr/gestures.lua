-- Flux touchpad gestures
-- Swipe to switch workspaces, pinch to zoom

hl.config({
  gestures = {
    workspace_swipe = true,
    workspace_swipe_fingers = 3,
    workspace_swipe_distance = 300,
    workspace_swipe_invert = true,
    workspace_swipe_min_speed_to_force = 30,
    workspace_swipe_cancel_ratio = 0.5,
    workspace_swipe_create_new = true,
    workspace_swipe_direction_lock = true,
    workspace_swipe_direction_lock_threshold = 10,
    workspace_swipe_forever = false,
  },

  input = {
    touchpad = {
      natural_scroll = true,
      disable_while_typing = true,
      tap_to_click = true,
      drag_lock = false,
      scroll_factor = 1.0,
      middle_button_emulation = false,
      clickfinger_behavior = false,
    },
  },
})

-- 4-finger swipe up/down for special workspace (scratchpad)
hl.bind("", "swipe:4:u", hl.dsp.exec_cmd("hyprctl dispatch togglespecialworkspace magic"), {})
hl.bind("", "swipe:4:d", hl.dsp.exec_cmd("hyprctl dispatch togglespecialworkspace magic"), {})

-- Pinch to zoom
hl.bind("", "pinch:in",  function() 
  local zoom = hl.get_config("cursor.zoom_factor") or 1
  if zoom > 1 then hl.config({ cursor = { zoom_factor = math.max(1, zoom - 0.5) } }) end
end, {})
hl.bind("", "pinch:out", function()
  local zoom = hl.get_config("cursor.zoom_factor") or 1
  hl.config({ cursor = { zoom_factor = zoom + 0.5 } })
end, {})
