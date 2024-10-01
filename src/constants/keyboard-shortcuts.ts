import { monaco } from "@/services";
import { useFileSystem, useSettingStore } from "@/stores";

export const NAVIGATION_SHORTCUTS = [
  {
    shortcut: "CommandOrControl+/",
    to: "/keyboard-shortcuts",
    description: "Open keyboard shortcuts"
  },
  {
    shortcut: "CommandOrControl+,",
    to: "/settings",
    description: "Open settings"
  }
] as const;

export const GLOBAL_SHORTCUTS = [
  {
    shortcut: "Shift+Alt+t",
    description: "Switch always on top mode",
    async handler() {
      // const { alwaysOnTop, toggleAlwaysOnTop } = useSettingStore.getState()
      // await tauriWindow.setAlwaysOnTop(!alwaysOnTop)
      // toggleAlwaysOnTop()
      useSettingStore.getState().toggleAlwaysOnTop()
      console.debug("Switch always on top mode");
    }
  },
  {
    shortcut: "CommandOrControl+Shift+d",
    description: "Toggle dark mode",
    handler() {
      useSettingStore.getState().updateTheme(
        useSettingStore.getState().theme === "vs-dark" ? "vs-light" : "vs-dark"
      );
      console.debug("Toggle dark mode");
    }
  },
  {
    shortcut: "F11",
    description: "Toggle full screen mode",
    async handler() {
      await useSettingStore.getState().toggleFullscreen()
      // let isFullscreen = await tauriWindow.isFullscreen();
      // console.debug(`Fullscreen mode ${!isFullscreen ? 'enabled' : 'disabled'}`);
      // await tauriWindow.setFullscreen(!isFullscreen);
      // isFullscreen = await tauriWindow.isFullscreen();
      // console.debug(`Fullscreen mode ${!isFullscreen ? 'enabled' : 'disabled'}`);
      // console.debug("Toggle full screen mode");
    }
  },
  {
    // keys: CTRL_CMD | o,
    shortcut: "CommandOrControl+o",
    description: "Open file",
    async handler() {
      await useFileSystem.getState().openFile()
      // console.warn('pending implementation')
      console.debug("Open file");
    }
  },
  // {
  //   // keys: CTRL_CMD | o,
  //   shortcut: "Alt+f",
  //   description: "Open menu",
  //   async handler() {
  //     // useContextMenu.getState().setOpenedMenu({
  //     //   menuName: "app-menu",
  //     // });
  //     // console.debug("Open menu");
  //   }
  // },
] as const;

// editor key constants
const
  CTRL_CMD = monaco.KeyMod.CtrlCmd,
  SHIFT = monaco.KeyMod.Shift,
  ALT = monaco.KeyMod.Alt,
  TAB = monaco.KeyCode.Tab,
  // F11 = monaco.KeyCode.F11,
  t = monaco.KeyCode.KeyT,
  n = monaco.KeyCode.KeyN,
  w = monaco.KeyCode.KeyW,
  s = monaco.KeyCode.KeyS,
  z = monaco.KeyCode.KeyZ,
  x = monaco.KeyCode.KeyX,
  // o = monaco.KeyCode.KeyO,
  m = monaco.KeyCode.KeyM;

export const EDITOR_SHORTCUTS = [
  {
    keys: CTRL_CMD | s,
    shortcut: "CommandOrControl+s",
    description: "Save the current file",
    handler() {
      useFileSystem.getState().saveFile();
      // console.warn('pending implementation')
      console.debug("Save the current file");
    }
  },
  {
    keys: CTRL_CMD | SHIFT | s,
    shortcut: "CommandOrControl+Shift+S",
    description: "Save the file as a new version",
    handler() {
      useFileSystem.getState().saveFileAs()
      // console.warn('pending implementation')
      console.debug("Save the file as a new version");
    }
  },
  {
    keys: ALT | z,
    shortcut: "Alt+z",
    description: "Enable/disable line wrapping",
    handler() {
      useSettingStore.getState().toggleWordWrap()
      console.debug("Enable/disable line wrapping");
    }
  },
  {
    keys: ALT | x,
    shortcut: "Alt+x",
    description: "Show/hide line numbers",
    handler() {
      useSettingStore.getState().toggleLineNumber()
      console.debug("Show/hide line numbers");
    }
  },
  {
    keys: CTRL_CMD | SHIFT | m,
    shortcut: "CommandOrControl+Shift+M",
    description: "Toggle tab and footer visibility (zen mode)",
    handler() {
      useSettingStore.getState().toggleZenMode()
      console.debug("Toggle tab and footer visibility");
    }
  },
  {
    keys: CTRL_CMD | t,
    shortcut: "CommandOrControl+t",
    description: "Open a new tab",
    handler() {
      useFileSystem.getState().addNewFile();
      console.debug("Open a new tab");
    }
  },
  // {
  //   keys: CTRL_CMD | o,
  //   shortcut: "CommandOrControl+o",
  //   description: "Open file",
  //   handler() {
  //     useFileSystem.getState().openFile()
  //     // console.warn('pending implementation')
  //     console.debug("Open file");
  //   }
  // },
  {
    keys: CTRL_CMD | n,
    shortcut: "CommandOrControl+n",
    description: "Open a new tab",
    handler() {
      useFileSystem.getState().addNewFile()
      console.debug("Open a new tab");
    }
  },
  {
    keys: CTRL_CMD | SHIFT | t,
    shortcut: "CommandOrControl+Shift+T",
    description: "Reopens last closed tab",
    handler() {
      useFileSystem.getState().popFileHistory()
      console.debug("Reopens last closed tab");
    }
  },
  {
    keys: CTRL_CMD | w,
    shortcut: "CommandOrControl+w",
    description: "Close the current tab",
    async handler() {
      useFileSystem.getState().closeFile()
      // const { files, focusedFileId, closeFile, addNewFile, setFocusedFileId } = useFileSystem.getState()
      // if (!focusedFileId) return

      // for (let i = 0; i < files.length; i++) {
      //   if (files[i].id !== focusedFileId) continue

      //   if (!files[i].saved && files[i].contents.length > 0) {
      //     const save = await dialog.confirm(
      //       `Do you want to save changes to ${files[i].name}.${files[i].extension}`,
      //       {
      //         title: 'Unsaved changes',
      //         kind: "warning"
      //       }
      //     )
      //     if (save) {

      //       // useFileSystem.getState().saveFile()
      //       console.warn('pending implementation')
      //     }
      //   }

      //   closeFile(files[i])

      //   if (i === 0 && files.length === 1) {
      //     addNewFile()
      //   } else if (i === 0 && files.length > 1) {
      //     setFocusedFileId(files[i + 1].id)
      //   } else if (i === files.length - 1) {
      //     setFocusedFileId(files[i - 1].id)
      //   }
      //   break
      // }

      // console.debug("Close the current tab");
    }
  },
  {
    keys: CTRL_CMD | TAB,
    shortcut: "CommandOrControl+Tab",
    description: "Navigate to the next tab",
    handler() {
      const { files, focusedFileId, setFocusedFileId } = useFileSystem.getState()
      if (!focusedFileId) return
      for (let i = 0; i < files.length; i++) {
        if (files[i].id == focusedFileId) {
          if (files.length === i + 1) {
            setFocusedFileId(files[0].id)
          } else {
            setFocusedFileId(files[i + 1].id)
          }
          break
        }
      }
      console.debug("Navigate to the next tab");
    }
  },
  {
    keys: CTRL_CMD | SHIFT | TAB,
    shortcut: "CommandOrControl+Shift+Tab",
    description: "Navigate to the previous tab",
    handler() {
      const { files, focusedFileId, setFocusedFileId } = useFileSystem.getState()
      if (!focusedFileId) return
      for (let i = 0; i < files.length; i++) {
        if (files[i].id == focusedFileId) {
          if (i === 0) {
            setFocusedFileId(files[files.length - 1].id)
          } else {
            setFocusedFileId(files[i - 1].id)
          }
          break
        }
      }
      console.debug("Navigate to the previous tab");
    }
  },
]

export const EDITOR_PRE_BUILT_SHORTCUTS = [
  {
    shortcut: "CommandOrControl+x",
    description: "Cut the line if no text selected",
  },
  {
    shortcut: "CommandOrControl+c",
    description: "Copy the line if no text selected",
  },
  {
    shortcut: "CommandOrControl+v",
    description: "Paste the line if no text selected",
  }
] as const;
