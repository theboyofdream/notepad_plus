import { appWindow } from "@tauri-apps/api/window";
import { create } from "zustand";

interface SharedStore {
  activeNoteId?: string;
  setActiveNoteId: (id: string) => void;
  showLineNumber: boolean
  toggleLineNumber: () => void
  wordWrap: "on" | "off"
  toggleWordWrap: () => void
  showTabs: boolean
  toggleTabsVisibility: () => void
  showFooter: boolean
  toggleFooterVisibility: () => void
  cursorPosition: {
    lineNumber: number,
    columnNumber: number
  },
  updateCursorPosition: (lineNumber: number, columnNumber: number) => void
  isAlwaysOnTop: boolean
  toggleAlwayOnTop: () => void
}

export const useSharedStore = create<SharedStore>()((set, get) => ({

  activeNoteId: "",
  setActiveNoteId(id) {
    set(() => ({
      activeNoteId: id,
    }));
  },

  showLineNumber: false,
  toggleLineNumber() {
    set(() => ({
      showLineNumber: !this.showLineNumber
    }))
  },

  wordWrap: 'off',
  toggleWordWrap() {
    set(() => ({
      wordWrap: this.wordWrap === "on" ? "off" : "on"
    }))
  },

  showTabs: true,
  toggleTabsVisibility() {
    set(() => ({
      showTabs: !this.showTabs
    }))
  },

  showFooter: true,
  toggleFooterVisibility() {
    set(() => ({
      showFooter: !this.showFooter
    }))
  },

  cursorPosition: {
    lineNumber: 0,
    columnNumber: 0,
  },
  updateCursorPosition(lineNumber, columnNumber) {
    set(() => ({
      cursorPosition: { lineNumber, columnNumber }
    }))
  },

  isAlwaysOnTop: false,
  async toggleAlwayOnTop() {
    await appWindow.setAlwaysOnTop(!get().isAlwaysOnTop)
      .then(
        () =>
          set(() => ({ isAlwaysOnTop: !get().isAlwaysOnTop }))
      )
  }
}));
