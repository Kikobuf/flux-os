-- Flux Phase 2 bindings
-- Right-click desktop menu, taskbar mode, screenshot GUI, battery mode

-- Right-click on empty desktop → context menu
hl.bind("", "mouse:273", function()
  -- Only fire on empty desktop (no focused window)
  local focused = hl.get_focused_client()
  if not focused then
    hl.exec_cmd("flux-desktop-menu")
  end
end, { description = "Desktop right-click menu" })

-- Screenshot GUI (replaces basic PRINT binding)
hl.bind("PRINT", hl.dsp.exec_cmd("flux-screenshot menu"), { description = "Screenshot menu" })
hl.bind("SUPER + PRINT", hl.dsp.exec_cmd("flux-screenshot region"), { description = "Screenshot region" })
hl.bind("SHIFT + PRINT", hl.dsp.exec_cmd("flux-screenshot window"), { description = "Screenshot window" })
hl.bind("CTRL + PRINT", hl.dsp.exec_cmd("flux-screenshot fullscreen"), { description = "Screenshot fullscreen" })

-- Taskbar mode toggle
hl.bind("SUPER + ALT + T", hl.dsp.exec_cmd("flux-taskbar-mode toggle"), { description = "Toggle taskbar/tiling mode" })

-- Battery mode
hl.bind("SUPER + ALT + B", hl.dsp.exec_cmd("flux-battery-mode toggle"), { description = "Toggle battery saver" })

-- Monitor wizard
hl.bind("SUPER + ALT + M", hl.dsp.exec_cmd("flux-monitor-wizard"), { description = "Monitor setup wizard" })

-- Open Dolphin file manager
hl.bind("SUPER + E", hl.dsp.exec_cmd("dolphin"), { description = "Open file manager" })

-- KDE Connect
hl.bind("SUPER + ALT + K", hl.dsp.exec_cmd("kdeconnect-app"), { description = "KDE Connect" })

-- Flux Settings (Super+comma like macOS System Preferences)
hl.bind("SUPER + COMMA", hl.dsp.exec_cmd("flux-settings"), { description = "Open Flux Settings" })

-- Flux App Installer
hl.bind("SUPER + ALT + I", hl.dsp.exec_cmd("flux-installer"), { description = "Open App Installer" })

-- Flux AI Assistant toggle (Super+A)
hl.bind("SUPER + A", hl.dsp.exec_cmd("flux-assistant"), { description = "Toggle AI assistant" })
