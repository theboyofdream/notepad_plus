import { tauriWindow } from "@/services";
import { useContextMenu, useFileSystem, useSettingStore } from "@/stores";
import { useLocation } from "@tanstack/react-router";
import { AlignLeft, Minus, Pin, PinOff, Square, X } from "lucide-react";

export function AppHeader() {
  let { pathname } = useLocation();
  pathname = pathname.replace(/\//g, "");
  // console.log(pathname);
  const { setOpenedMenu } = useContextMenu();
  const open = () =>
    setOpenedMenu({
      menuName: "app-menu",
    });

  const { focusedFileId, getFileById } = useFileSystem();
  const file = getFileById(focusedFileId ?? "");

  const { fullscreen, toggleFullscreen, alwaysOnTop, toggleAlwaysOnTop } =
    useSettingStore();

  // tauriWindow.onResized((e) => {
  //   const windowSize = e.payload;
  //   window.currentMonitor().then((monitor) => {
  //     // console.debug({ monitor });
  //     const monitorSize = monitor?.size;
  //     if (monitorSize) {
  //       if (
  //         windowSize.width === monitorSize.width &&
  //         windowSize.height === monitorSize.height
  //       ) {
  //         useSettingStore.getState().setFullscreen(true);
  //       }
  //     }
  //   });
  // });

  return (
    <div
      className="flex w-full items-center justify-between"
      data-tauri-drag-region
      onDoubleClick={() => {
        toggleFullscreen();
        // e.stopPropagation();
      }}
    >
      {/* flex-1 */}
      <span className="flex items-center" data-tauri-drag-region>
        {/* <button>
          <img src="/icon.png" className="w-6 h-6 p-1" alt="icon" />
        </button> */}
        <button
          className="p-1 px-2 flex items-baseline hover justify-center"
          onClick={open}
          aria-label="f"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
      </span>

      <span
        data-tauri-drag-region
        className="flex flex-1 items-center justify-center text-xs gap-1 select-none"
      >
        <span data-tauri-drag-region>
          <p className="line-clamp-1 text-center" data-tauri-drag-region>
            {pathname.trim() == "" ? (
              <>
                {file?.saved ? "" : "*"}
                {file?.name}
                {file?.extension && "."}
                {file?.extension}
              </>
            ) : (
              pathname
            )}
          </p>
          {/* <p
            className="line-clamp-1 text-center opacity-80"
            style={{ fontSize: "0.8em" }}
          >
            {file?.path}
          </p> */}
        </span>
        {/* <p data-tauri-drag-region className="line-clamp-1">
          {file?.name}
          {file?.saved ? "" : "*"}
          {file?.extension && "."}
          {file?.extension}
        </p>
        <p data-tauri-drag-region>{"-"}</p>
        <p data-tauri-drag-region>
          {(file?.path ?? "").length <= 0 ? "no path" : file?.path}
        </p> */}
      </span>

      {/*  flex-1 */}
      <span className="flex items-center justify-end" data-tauri-drag-region>
        <button
          className="p-1 flex items-baseline hover outline-none justify-center"
          onClick={toggleAlwaysOnTop}
        >
          {alwaysOnTop ? (
            <PinOff className="w-3.5 h-3.5" />
          ) : (
            <Pin className="w-3.5 h-3.5" />
          )}
        </button>
        <button
          className="p-1 flex items-baseline hover outline-none justify-center overflow-hidden"
          onClick={() => tauriWindow.minimize()}
        >
          <Minus className="w-4 h-4 translate-y-1" />
        </button>
        <button
          className="p-1 flex items-center outline-none justify-center hover"
          onClick={toggleFullscreen}
        >
          {fullscreen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 fill-current rotate-180"
            >
              <path d="M20,16V4H8V16H20M22,16A2,2 0 0,1 20,18H8C6.89,18 6,17.1 6,16V4C6,2.89 6.89,2 8,2H20A2,2 0 0,1 22,4V16M16,20V22H4A2,2 0 0,1 2,20V7H4V20H16Z" />
            </svg>
          ) : (
            <Square className="w-3.5 h-3.5" />
          )}
        </button>
        <button
          className="p-1 pl-2 py-1 flex items-center justify-center outline-none hover:bg-red-500"
          onClick={() => {
            tauriWindow.close();
          }}
        >
          <X className="w-4 h-4 -translate-x-1" />
        </button>
      </span>
    </div>
  );
}
