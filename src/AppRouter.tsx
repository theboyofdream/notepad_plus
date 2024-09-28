import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./App.css";
// import { GLOBAL_KEYBOARD_SHORTCUTS } from "./constants/keyboard-shortcuts";
import { useSettingStore } from "./stores/useSettingStore";

// Import the generated route tree
import { useGlobalShortcuts } from "./hooks/useGlobalShortcuts";
import { routeTree } from "./routeTree.gen";

import {
  restoreStateCurrent,
  saveWindowState,
  StateFlags,
} from "@tauri-apps/plugin-window-state";
// when using `"withGlobalTauri": true`, you may use
// const { saveWindowState, StateFlags } = window.__TAURI_PLUGIN_WINDOW_STATE__;

saveWindowState(StateFlags.ALL);
restoreStateCurrent(StateFlags.ALL);

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AppRouter() {
  useGlobalShortcuts();
  const darkMode = useSettingStore((state) => state.theme) === "vs-dark";

  // useEffect(() => {
  //   document.addEventListener("keyup", bindGlobalKeyboardShortcuts);

  //   return () => {
  //     document.removeEventListener("keyup", bindGlobalKeyboardShortcuts);
  //   };
  // }, []);

  return (
    <div
      className={`${
        darkMode ? "dark" : ""
      } flex flex-col w-screen h-screen overflow-scroll bg-white dark:bg-neutral-800 text-black dark:text-white`}
    >
      <RouterProvider
        router={router}
        // defaultNotFoundComponent={ErrorPage}
      />
    </div>
  );
}

export default AppRouter;

// import { appWindow } from "@tauri-apps/api/window";
// // import GLOBAL_KEYBOARD_SHORTCUTS from "./constants/GLOBAL_SHORTCUTS";
// import { useEffect } from "react";
// import { GLOBAL_KEYBOARD_SHORTCUTS } from "./constants/keyboard-shortcuts";
// import { Editor } from "./pages/EditorPage";
// import { KeyboardShortcutPage } from "./pages/KeyboardShortcutPage";
// import { Settings } from "./pages/SettingsPage";
// import { useSettingStore } from "./stores/useSettingStore";

// appWindow.onFileDropEvent((e) => {
//   console.log(e);
// });

// // async function bindGlobalKeyboardShortcuts() {
// //   for (let { shortcut, handler } of GLOBAL_KEYBOARD_SHORTCUTS) {
// //     if (await globalShortcut.isRegistered(shortcut)) {
// //       await globalShortcut.unregister(shortcut);
// //     }
// //     await globalShortcut.register(shortcut, handler);
// //   }
// // }
// // globalShortcut.unregisterAll();
// // bindGlobalKeyboardShortcuts();
// const SHORTCUTS = [...GLOBAL_KEYBOARD_SHORTCUTS];

// function bindGlobalKeyboardShortcuts(e: KeyboardEvent) {
//   const CTRL_KEY = e.ctrlKey || e.metaKey;
//   const SHIFT_KEY = e.shiftKey;
//   const ALT_KEY = e.altKey;
//   const KEY = e.key.toLowerCase(); // Normalize key to lowercase for comparison

//   // Helper function to format the shortcut key string
//   const formatShortcut = () => {
//     let formattedShortcut = "";
//     if (CTRL_KEY) formattedShortcut += "CommandOrControl+";
//     if (ALT_KEY) formattedShortcut += "Alt+";
//     if (SHIFT_KEY) formattedShortcut += "Shift+";
//     formattedShortcut += KEY;
//     return formattedShortcut;
//   };

//   const pressedShortcut = formatShortcut();

//   // console.debug({
//   //   CTRL_KEY,
//   //   SHIFT_KEY,
//   //   ALT_KEY,
//   //   KEY,
//   //   pressedShortcut,
//   // });

//   // Loop through the defined global shortcuts and trigger the handler if a match is found
//   for (let { shortcut, handler } of GLOBAL_KEYBOARD_SHORTCUTS) {
//     if (shortcut.toLowerCase() === pressedShortcut.toLowerCase()) {
//       e.preventDefault(); // Prevent default action if the shortcut is matched
//       handler(); // Trigger the associated handler
//       return;
//     }
//   }
// }

// export default function App() {
//   const activeRoute = useSettingStore((state) => state.activeRoute);
//   const darkMode = useSettingStore((state) => state.theme) === "vs-dark";

//   // useEffect(() => {
//   //   window.appWindow.setDecorations(false);
//   // }, []);

//   useEffect(() => {
//     document.addEventListener("keyup", bindGlobalKeyboardShortcuts);

//     return () => {
//       document.removeEventListener("keyup", bindGlobalKeyboardShortcuts);
//     };
//   }, []);

//   return (
//     // bg-zinc-800 text-slate-200
//     <div
//       className={`${
//         darkMode ? "dark" : ""
//       } flex flex-col w-screen h-screen overflow-scroll bg-white dark:bg-neutral-800 text-black dark:text-white`}
//     >
//       {activeRoute === "editor" && <Editor />}
//       {activeRoute === "settings" && <Settings />}
//       {activeRoute === "keyboard-shortcuts" && <KeyboardShortcutPage />}
//     </div>
//   );
// }
