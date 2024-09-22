import { create } from "zustand"

type SettingStore = {
  showLineNumber: boolean
  toggleLineNumber: fn

  wordWrap: boolean
  toggleWordWrap: fn

  zenMode: boolean
  toggleZenMode: fn

  alwaysOnTop: boolean
  toggleAlwaysOnTop: fn

  theme: string
  updateTheme: fn<void, string>
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
  updateTheme: (theme) => set(state => ({ theme }))
}))
