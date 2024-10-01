import {
  Alerts,
  AppHeader,
  AppMenu,
  Dialog,
  EditorFooterMenu,
} from "@/components";
import { useGlobalShortcuts, useNavigationShortcuts } from "@/hooks";
import { webview } from "@/services";
import { useFileSystem } from "@/stores";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

let handlingDrop = false;
webview.listen("tauri://drag-drop", async (event) => {
  if (handlingDrop) return;
  handlingDrop = true;
  // console.log("dropped file paths", event.payload.paths);

  for (const path of (event.payload as any).paths) {
    await useFileSystem.getState().openDroppedFile(path);
  }

  handlingDrop = false;
});

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  useGlobalShortcuts();
  useNavigationShortcuts();

  useEffect(() => {
    function onRightClick(e: MouseEvent) {
      e.preventDefault();
    }

    window.addEventListener("contextmenu", onRightClick);
    return () => {
      window.removeEventListener("contextmenu", onRightClick);
    };
  }, []);

  return (
    <>
      <AppHeader />
      <Outlet />
      <Dialog />
      <AppMenu />
      {/* <EditorTabMenu /> */}
      <EditorFooterMenu />
      <Alerts />
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}
