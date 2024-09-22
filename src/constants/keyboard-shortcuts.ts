export const GLOBAL_KEYBOARD_SHORTCUTS = [
  {
    shortcut: "CommandOrControl+Alt+t",
    description: "Switch always on top mode",
    handler() {
      console.debug("Switch always on top mode");
    }
  },
  {
    shortcut: "CommandOrControl+s",
    description: "Save the current file",
    handler() {
      console.debug("Save the current file");
    }
  },
  {
    shortcut: "CommandOrControl+Shift+S",
    description: "Save the file as a new version",
    handler() {
      console.debug("Save the file as a new version");
    }
  },
  {
    shortcut: "Alt+z",
    description: "Enable/disable line wrapping",
    handler() {
      console.debug("Enable/disable line wrapping");
    }
  },
  {
    shortcut: "Alt+x",
    description: "Show/hide line numbers",
    handler() {
      console.debug("Show/hide line numbers");
    }
  },
  {
    shortcut: "CommandOrControl+Shift+M",
    description: "Toggle tab and footer visibility",
    handler() {
      console.debug("Toggle tab and footer visibility");
    }
  },
  {
    shortcut: "CommandOrControl+,",
    description: "Open/close settings",
    handler() {
      console.debug("Open/close settings");
    }
  },
  {
    shortcut: "CommandOrControl+/",
    description: "Show/hide keyboard shortcuts",
    handler() {
      console.debug("Show/hide keyboard shortcuts");
    }
  },
  {
    shortcut: "CommandOrControl+t",
    description: "Open a new tab",
    handler() {
      console.debug("Open a new tab");
    }
  },
  {
    shortcut: "CommandOrControl+o",
    description: "Open file",
    handler() {
      console.debug("Open file");
    }
  },
  {
    shortcut: "CommandOrControl+n",
    description: "Open a new tab",
    handler() {
      console.debug("Open a new tab");
    }
  },
  {
    shortcut: "CommandOrControl+Shift+T",
    description: "Reopens last closed tab",
    handler() {
      console.debug("Reopens last closed tab");
    }
  },
  {
    shortcut: "CommandOrControl+w",
    description: "Close the current tab",
    handler() {
      console.debug("Close the current tab");
    }
  },
  {
    shortcut: "CommandOrControl+Tab",
    description: "Navigate to the next tab",
    handler() {
      console.debug("Navigate to the next tab");
    }
  },
  {
    shortcut: "CommandOrControl+Shift+Tab",
    description: "Navigate to the previous tab",
    handler() {
      console.debug("Navigate to the previous tab");
    }
  },
  {
    shortcut: "F11",
    description: "Toggle full screen mode",
    handler() {
      console.debug("Toggle full screen mode");
    }
  }
] as const;

export const EDITOR_PRE_BUILT_SHORTCUTS = [
  {
    shortcut: "CommandOrControl+Alt+t",
    description: "Switch always on top mode",
  }
] as const
