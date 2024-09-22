import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { documentDir } from '@tauri-apps/api/path';
import { create } from 'zustand';

interface AppConfig {
  activeNoteId?: string
  showLineNumber: boolean
  wordWrap: boolean
  showTabs: boolean
  showFooter: boolean
  openedNotes: Note[]
  defaultFolderPathToSaveFile?: string
  autoSaveEnabled: boolean
}

interface AppStore {
  state: AppConfig
  updateState: (state: Partial<AppConfig>) => Promise<void>
  saveConfig: () => Promise<void>;
  loadConfig: () => Promise<void>;
}

export const useAppStore = create<AppStore>((set, get) => ({
  state: {
    showLineNumber: true,
    wordWrap: true,
    showTabs: true,
    showFooter: true,
    openedNotes: [],
    autoSaveEnabled: true,
  },
  updateState(newState) {
    set((store) => ({ state: { ...store.state, ...newState } }))
    return this.saveConfig()
  },
  saveConfig: async () => {
    const config = JSON.stringify(get().state, null, 2);
    const configPath = await documentDir() + 'app-config.json';
    await writeTextFile(configPath, config);
  },
  loadConfig: async () => {
    try {
      const configPath = await documentDir() + 'app-config.json';
      const configJson = await readTextFile(configPath);
      const config = JSON.parse(configJson);
      set({ state: config })
    } catch (error) {
      console.error('Error loading config:', error);
    }
  },
}));

