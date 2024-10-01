import { create } from "zustand";

type ContextMenus = "app-menu" | "editor" | "editor-footer" | "editor-tab"

type setOpenedMenuParams = {
  menuName: ContextMenus,
  clickPosition?: { x: number, y: number },
  tabIndex?: number
}

interface ContextMenuStore {
  openedMenu?: ContextMenus
  clickPosition: { x: number, y: number }
  tabIndex: number
  setOpenedMenu: (params: setOpenedMenuParams) => void
  closeMenu: () => void
}

export const useContextMenu = create<ContextMenuStore>((set) => ({
  openedMenu: undefined,
  clickPosition: { x: 0, y: 0 },
  tabIndex: 0,
  setOpenedMenu: ({ menuName, clickPosition, tabIndex }) => set({ openedMenu: menuName, clickPosition, tabIndex }),
  closeMenu: () => set({ openedMenu: undefined }),
}))
