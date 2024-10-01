import { BaseDirectory, exists, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

const STORAGE_FILE_PATH = 'app-data.json';
const CONFIG = {
  baseDir: BaseDirectory.AppData,
};

let storage: Record<string, any> = {};

// Custom load function
async function load() {
  try {
    if (!(await exists(STORAGE_FILE_PATH, CONFIG))) {
      await writeTextFile(STORAGE_FILE_PATH, "{}", CONFIG);
    }
    let res = JSON.parse(await readTextFile(STORAGE_FILE_PATH, CONFIG));
    storage = typeof res === 'object' ? res : {};
  } catch (error) {
    console.debug('Failed to load data:', error);
  }
}

// Custom save function
async function save() {
  try {
    await writeTextFile(STORAGE_FILE_PATH, JSON.stringify(storage), CONFIG);
  } catch (error) {
    console.debug('Failed to save data:', error);
  }
}

// Initialize storage on load
load();

// Custom storage object for Zustand's persist middleware
export const localStorage = {
  getItem: async (name: string) => {
    await load();
    return storage[name] || null;
  },
  setItem: async (name: string, value: any) => {
    storage[name] = value;
    await save();
  },
  removeItem: async (name: string) => {
    delete storage[name];
    await save();
  },
};
