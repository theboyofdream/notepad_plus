import { create } from "zustand";

interface EditorStatsStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  clickPosition: { x: number; y: number };
  setClickPosition: (position: { x: number; y: number }) => void;
}

export const useEditorStats = create<EditorStatsStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  clickPosition: { x: 0, y: 0 },
  setClickPosition: (position) => set({ clickPosition: position }),
}));

