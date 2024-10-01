import { create } from "zustand";

interface AppMenu {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useAppMenu = create<AppMenu>((set) => ({
  isOpen: false,
  open() {
    set({ isOpen: true });
  },
  close() {
    set({ isOpen: false });
  },
}));
