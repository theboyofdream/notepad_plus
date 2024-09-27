import { create } from "zustand"

type Route = 'editor' | 'settings' | 'keyboard-shortcuts'

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

  activeRoute: Route
  updateActiveRoute: (route: Route) => void
}

export const useSettingStore = create<SettingStore>()((set) => ({
  showLineNumber: false,
  toggleLineNumber: () => set(state => ({ showLineNumber: !state.showLineNumber })),

  wordWrap: false,
  toggleWordWrap: () => set(state => ({ wordWrap: !state.wordWrap })),

  zenMode: false,
  toggleZenMode: () => set(state => ({ zenMode: !state.zenMode })),

  alwaysOnTop: false,
  toggleAlwaysOnTop: () => set(state => ({ alwaysOnTop: !state.alwaysOnTop })),

  theme: 'vs-dark',
  updateTheme: (theme) => set(_ => ({ theme })),

  activeRoute: 'editor',
  // activeRoute: "settings",
  updateActiveRoute: (route) => set(_ => ({ activeRoute: route }))
}))
