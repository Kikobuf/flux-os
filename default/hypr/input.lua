-- https://wiki.hypr.land/Configuring/Basics/Variables/#input
hl.config({
  input = {
    kb_layout = "us",
    kb_variant = "",
    kb_model = "",
    kb_options = "compose:caps",
    kb_rules = "",
    follow_mouse = 1,
    sensitivity = 0,

    touchpad = {
      natural_scroll = true,
      disable_while_typing = true,
      tap_to_click = true,
      tap_button_map = "lrm",
      drag_lock = false,
      scroll_factor = 1.0,
    },
  },

  gestures = {
    workspace_swipe = true,
    workspace_swipe_fingers = 3,
    workspace_swipe_distance = 300,
    workspace_swipe_invert = true,
    workspace_swipe_min_speed_to_force = 30,
    workspace_swipe_cancel_ratio = 0.5,
    workspace_swipe_create_new = true,
    workspace_swipe_direction_lock = true,
    workspace_swipe_forever = false,
  },

  misc = {
    key_press_enables_dpms = true,
    mouse_move_enables_dpms = true,
  },
})
