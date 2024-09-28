import { fs } from "@tauri-apps/api";
import { create } from "zustand";

type FileSystemStore = {
  files: IFile[],
  getFileById: fn<IFile | null, string>,

  // updateFileContents: ({ file, contents }: { file: IFile, contents: string }) => void,
  updateFileContents: fn<void, { id: string, contents: string }>,

  addNewFile: () => void,
  renameFile: fn<void, { file: IFile, newName: string }>,
  closeFile: fn<boolean, IFile>,
  // saveFile: fn<boolean, IFile>,
  // saveFileAs: fn<boolean, IFile>,

  focusedFile: IFile | undefined,
  focusedFileId: string | undefined,
  setFocusedFile: fn<void, IFile>
  setFocusedFileId: fn<void, string>,

  openedFileHistory: IFile[],
  pushFileHistory: fn<void, IFile>,
  // popFileHistory: fn<IFile | undefined>,
  popFileHistory: () => IFile | null,

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

let count = 0;

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
  updateFileContents({ id, contents }) {
    console.debug("updateFileContents", { id, contents });
    set(state => ({
      files: state.files.map(f => f.id == id ? { ...f, contents } : f)
    }))
  },
  addNewFile() {
    const newFile: IFile = {
      // id: (new Date().getTime()).toString(),
      id: `${count}`,
      // name: "Untitled",
      name: `${count}`,
      extension: "txt",
      contents: "",
      path: "",
      saved: false
    }
    console.log("addNewFile", newFile);
    set(state => ({ files: [...state.files, newFile] }))
    get().setFocusedFileId(newFile.id)
    count++;
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
    // if (!file.saved) {
    //   dialog.ask("Are you sure! Discard changes!", {
    //     title: "Unsaved change!",
    //     type: "warning"
    //   })
    // }
    set(state => ({
      files: state.files.filter(f => f.id != file.id)
    }))
    get().pushFileHistory(file)
    // return false
  },
  // saveFile() { },
  // saveFileAs() { },

  focusedFile: undefined,
  focusedFileId: undefined,
  setFocusedFileId: (id) => set(_ => ({ focusedFileId: id })),
  setFocusedFile: async (file) => {
    set(_ => ({ focusedFile: file }))
    // get().pushFileHistory(file)
    // await appWindow.setTitle(file.name);
  },

  openedFileHistory: [],
  pushFileHistory: (file) => set(state => ({ openedFileHistory: [...state.openedFileHistory, file] })),
  popFileHistory() {
    let history = get().openedFileHistory
    let lastOpenedFile = history.pop()
    if (lastOpenedFile) {
      set(_ => ({ openedFileHistory: history, files: [...get().files, lastOpenedFile] }))
      get().setFocusedFileId(lastOpenedFile.id)
      return lastOpenedFile
    }
    return null
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
