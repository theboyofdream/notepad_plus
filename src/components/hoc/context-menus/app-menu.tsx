import { goto } from "@/hooks";
import { useContextMenu, useFileSystem } from "@/stores";
import {
  FilePlus2,
  Keyboard,
  Save,
  Settings,
  SquareArrowOutUpRight,
} from "lucide-react";

const APP_MENU_LIST = [
  {
    icon: FilePlus2,
    text: "Create File",
    onClick: useFileSystem.getState().addNewFile,
  },
  {
    icon: SquareArrowOutUpRight,
    text: "Open File",
    onClick: useFileSystem.getState().openFile,
  },
  {
    icon: Save,
    text: "Save File",
    onClick: useFileSystem.getState().saveFile,
  },
  // {
  //   icon: SaveAll,
  //   text: "Save All",
  //   // onClick: useFileSystem.getState().saveFile,
  //   onClick: () => {
  //     useFileSystem.getState().files.forEach((file) => {
  //       useFileSystem.getState().saveFile(file);
  //     });
  //   },
  // },
  // {
  //   icon: FileX,
  //   text: "Close File",
  //   onClick: useFileSystem.getState().closeFile,
  // },
  // {
  //   icon: FileX,
  //   text: "Close All File",
  //   onClick: useFileSystem.getState().closeFile,
  // },
  {
    icon: Settings,
    text: "Settings",
    onClick: () => {
      goto("settings");
    },
  },
  {
    icon: Keyboard,
    text: "Keyboard Shortcuts",
    onClick: () => {
      goto("keyboard-shortcuts");
    },
  },
];

export function AppMenu() {
  const { openedMenu, closeMenu } = useContextMenu();
  const isOpen = openedMenu === "app-menu";

  function handleClick(fun?: () => void) {
    closeMenu();
    fun?.();
  }

  if (!isOpen) return null;
  return (
    <>
      <div
        className="fixed top-0 left-0 w-screen h-screen"
        onClick={closeMenu}
      />

      <div className="fixed select-none top-7 left-2 gap-1 text-xs rounded p-0.5 flex flex-col bg-white dark:bg-neutral-800 shadow border border-neutral-200 dark:border-neutral-700">
        {APP_MENU_LIST.map((item) => (
          <button
            key={item.text}
            className="flex gap-1.5 items-center p-1 px-1.5 hover !bg-opacity-70 rounded transition-colors"
            onClick={() => handleClick(item.onClick)}
          >
            <item.icon className="w-3.5 h-3.5" />
            <p>{item.text}</p>
          </button>
        ))}
      </div>
    </>
  );
}
