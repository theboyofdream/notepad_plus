import { useGlobalShortcuts } from "@/hooks";
import { useSettingStore } from "@/stores";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./App.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { tauriWindow } from "./services";

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
  const theme =
    useSettingStore((state) => state.theme) === "vs-dark" ? "dark" : "";

  return (
    <div
      className={`${theme} flex flex-col w-screen h-screen overflow-scroll bg-white dark:bg-neutral-800 text-black dark:text-white`}
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default AppRouter;

tauriWindow.setDecorations(false);
