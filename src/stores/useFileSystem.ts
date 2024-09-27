import { dialog, fs } from "@tauri-apps/api";
import { create } from "zustand";

type FileSystemStore = {
  files: IFile[],
  getFileById: fn<IFile | null, string>,

  addNewFile: () => void,
  renameFile: fn<void, { file: IFile, newName: string }>,
  closeFile: fn<boolean, IFile>,
  // saveFile: fn<boolean, IFile>,
  // saveFileAs: fn<boolean, IFile>,

  focusedFile: IFile | undefined,
  setFocusedFile: fn<void, IFile>

  openedFileHistory: IFile[],
  pushFileHistory: fn<void, IFile>,
  popFileHistory: fn<IFile | undefined>,

  autoSaveFile: boolean,
  toggleAutoSaveFile: () => void,
  autoSaveFileDir: string,
  setAutoSaveFileDir: (dirPath: string) => void,

  cursorPosition: {
    line: number
    column: number
  }
  updateCursorPosition: fn<void, { line: number, column: number }>
}

export const useFileSystem = create<FileSystemStore>()((set, get) => ({
  files: [],
  getFileById(id) {
    for (let i = 0; i < get().files.length; i++) {
      if (get().files[i].id == id) {
        return get().files[i]
      }
    }
    return null
  },
  addNewFile() {
    const newFile: IFile = {
      id: (new Date().getTime()).toString(),
      name: "Untitled",
      extension: "txt",
      contents: "",
      path: "",
      saved: false
    }
    set(state => ({ files: [...state.files, newFile] }))
    return newFile
  },
  renameFile({ file, newName }) {
    let files = get().files
    for (let i = 0; i < files.length; i++) {
      if (files[i].id == file.id) {
        files[i].name = newName
        set(_ => ({ files }))
        return
      }
    }
  },
  closeFile(file) {
    if (!file.saved) {
      dialog.ask("Are you sure! Discard changes!", {
        title: "Unsaved change!",
        type: "warning"
      })
    }
    set(state => ({
      files: state.files.filter(f => f.id != file.id)
    }))
    get().pushFileHistory(file)
    return false
  },
  // saveFile() { },
  // saveFileAs() { },

  focusedFile: undefined,
  setFocusedFile: (file) => set(_ => ({ focusedFile: file })),

  openedFileHistory: [],
  pushFileHistory: (file) => set(state => ({ openedFileHistory: [...state.openedFileHistory, file] })),
  popFileHistory() {
    let history = get().openedFileHistory
    let lastOpenedFile = history.pop()
    set(_ => ({ openedFileHistory: history }))
    return lastOpenedFile
  },

  autoSaveFile: false,
  toggleAutoSaveFile: () => set(state => ({ autoSaveFile: !state.autoSaveFile })),
  autoSaveFileDir: fs.BaseDirectory.Document.toString(),
  setAutoSaveFileDir: (dirPath) => set(_ => ({ autoSaveFileDir: dirPath })),

  cursorPosition: {
    line: 0,
    column: 0
  },
  updateCursorPosition: (cursorPosition) => set(_ => ({ cursorPosition }))
}))


useFileSystem.getState().addNewFile()
