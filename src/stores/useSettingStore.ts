import { tauriWindow } from "@/services"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type Route = 'editor' | 'settings' | 'keyboard-shortcuts'

type EditorStats = {
  totalLines: boolean
  totalWords: boolean
  totalCharacters: boolean
  autoSave: boolean
  theme: boolean
  cursorPosition: boolean
}


interface SettingStore {
  showLineNumber: boolean
  toggleLineNumber: () => void

  wordWrap: boolean
  toggleWordWrap: () => void

  zenMode: boolean
  toggleZenMode: () => void

  alwaysOnTop: boolean
  toggleAlwaysOnTop: () => void

  theme: theme
  updateTheme: (theme: theme) => void

  fullscreen: boolean
  toggleFullscreen: () => void
  setFullscreen: (fullscreen: boolean) => void

  activeRoute: Route
  updateActiveRoute: (route: Route) => void

  editorStats: EditorStats
  updateEditorStats: (stats: Partial<EditorStats>) => void

  hideEditorStats: boolean
  toggleHideEditorStats: () => void
}

export const useSettingStore = create<SettingStore>()(
  persist(
    (set, get) => ({
      showLineNumber: false,
      toggleLineNumber: () => set(state => ({ showLineNumber: !state.showLineNumber })),

      wordWrap: false,
      toggleWordWrap: () => set(state => ({ wordWrap: !state.wordWrap })),

      zenMode: false,
      toggleZenMode: () => set(state => ({ zenMode: !state.zenMode })),

      alwaysOnTop: false,
      toggleAlwaysOnTop: async () => {
        await tauriWindow.setAlwaysOnTop(!get().alwaysOnTop)
        set(state => ({ alwaysOnTop: !state.alwaysOnTop }))
      },

      theme: 'vs-dark',
      updateTheme: (theme) => set(_ => ({ theme })),

      fullscreen: false,
      toggleFullscreen: async () => {
        try {
          const { fullscreen } = get()
          await tauriWindow.setFullscreen(!fullscreen)
          set(_ => ({ fullscreen: !fullscreen }))
        } catch (error) {
          console.debug("Failed to toggle fullscreen", error)
          set(_ => ({ fullscreen: false }))
        }
      },
      setFullscreen: (fullscreen) => set(_ => ({ fullscreen })),

      activeRoute: 'editor',
      updateActiveRoute: (route) => set(_ => ({ activeRoute: route })),

      editorStats: {
        totalLines: true,
        totalWords: true,
        totalCharacters: true,
        autoSave: true,
        theme: true,
        cursorPosition: true,
      },
      updateEditorStats: (stats) => set(state => ({ editorStats: { ...state.editorStats, ...stats } })),

      hideEditorStats: false,
      toggleHideEditorStats: () => set(state => ({ hideEditorStats: !state.hideEditorStats })),
    }),
    {
      name: 'use-setting-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
