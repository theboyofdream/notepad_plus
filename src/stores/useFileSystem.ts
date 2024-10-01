// import { fs } from "@tauri-apps/api";
import { extractFileInfoFromPath } from "@/helpers";
import { dialog, fs } from "@/services";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { open, save, saveAs } from "./fs-utils";
import { useAlerts } from "./useAlerts";
import { useDialog } from "./useDialog";

type FileSystemStore = {
  files: IFile[],
  getFileById: fn<IFile | null, string>,

  // updateFileContents: ({ file, contents }: { file: IFile, contents: string }) => void,
  updateFileContents: fn<void, Partial<IFile>>,

  openFile: () => void,
  openDroppedFile: fn<void, string>,

  addFile: fn<void, IFile>,
  addNewFile: () => void,
  renameFile: fn<void, { id: string, newName: string }>,
  // closeFile: fn<boolean, IFile>,
  closeFile: (file?: IFile, msg?: string) => Promise<void>,

  saveFile: (file?: IFile) => Promise<boolean>,
  // saveFileAs: fn<boolean, IFile>,
  saveFileAs: () => Promise<boolean>,

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
  autoSaveFileDir: string | null,
  setAutoSaveFileDir: () => void,

  cursorPosition: {
    line: number
    column: number
  }
  updateCursorPosition: fn<void, { line: number, column: number }>
}

// let count = 0;
const { addAlert } = useAlerts.getState()

export const useFileSystem = create<FileSystemStore>()(
  persist(
    (set, get) => ({
      files: [{
        id: `${new Date().getTime()}`,
        name: "Untitled",
        extension: "txt",
        contents: "",
        path: "",
        saved: false
      }],
      getFileById(id) {
        for (let i = 0; i < get().files.length; i++) {
          if (get().files[i].id == id) {
            return get().files[i]
          }
        }
        return null
      },
      updateFileContents(updatedFile) {
        // console.debug("updateFileContents", { id, contents });
        set(state => ({
          files: state.files.map(file => {
            if (file.id == updatedFile.id) {
              // if (file.contents != updatedFile.contents || file.saved != updatedFile.saved) {
              return { ...file, ...updatedFile } as IFile
              // }
              // return file
              // return { ...file, contents, saved: false }
            }
            return file
          })
        }))

      },

      async openFile() {
        await open()
      },
      async openDroppedFile(filePath: string) {
        // console.log("openDroppedFile", filePath);
        // console.debug("exts", await fs.exists(`${filePath}`))
        fs.exists(`${filePath}`).then((exists) => {
          // console.log("exists", exists);
          if (!exists) return
          const { name, extension } = extractFileInfoFromPath(filePath)
          fs.readTextFile(filePath).then((contents) => {
            const file: IFile = {
              id: `${new Date().getTime()}`,
              name,
              extension,
              contents,
              path: filePath,
              saved: true
            }
            get().addFile(file)
          })
        })
      },
      addFile(file: IFile) {
        set(state => ({ files: [...state.files, file] }))
        get().setFocusedFileId(file.id)
      },
      addNewFile() {
        const newFile: IFile = {
          id: `${new Date().getTime()}`,
          name: "Untitled",
          extension: "txt",
          contents: "",
          path: "",
          saved: false
        }
        console.log("addNewFile", newFile);
        set(state => ({ files: [...state.files, newFile] }))
        get().setFocusedFileId(newFile.id)
        // count++;
        return newFile
      },
      renameFile({ id, newName }) {
        let files = get().files
        for (let i = 0; i < files.length; i++) {
          if (files[i].id == id) {
            files[i].name = newName
            set(_ => ({ files }))
            return
          }
        }
      },
      // closeFile(file) {
      //   set(state => ({
      //     files: state.files.filter(f => f.id != file.id)
      //   }))

      //   get().pushFileHistory(file)
      // },

      async closeFile(file, msg) {
        const { files, focusedFileId, saveFileAs, addNewFile, setFocusedFileId } = useFileSystem.getState()
        // console.debug("Close the current tab", files, focusedFileId);
        console.log("Close the current tab", files, focusedFileId);


        if (!focusedFileId && !file) return



        for (let i = 0; i < files.length; i++) {

          // let _file:IFile|null = null
          // if (file) {
          //   _file =  file
          // }
          // if (!file) {
          if (!file && files[i].id !== focusedFileId) continue
          // }

          const _file = file || files[i]

          console.log("Close the current tab", _file, i, files.length);

          if (_file.contents.length === 0) {
            console.log("condition 01", {
              _file,
              i,
              files,
              focusedFileId
            });
            close()
          } else if (_file.saved) {
            console.log("condition 02");
            close()
          }
          else if (!_file.saved && _file.contents.length > 0) {
            console.log("condition 03");

            useDialog.getState().setDialog({
              title: 'Save changes?',
              content: `Unsaved changes to ${_file.name}.${_file.extension}.\nChanges which are not saved will be permanently lost.`,
              actions: [
                {
                  label: "Save",
                  type: "primary",
                  keyShortcut: "s",
                  onClick: async () => {
                    if (await saveFileAs()) {
                      msg = `${_file.name}.${_file.extension} was saved`
                      close()
                      useDialog.getState().setDialog(undefined)
                    }
                    // else {
                    //   msg = `${_file.name}.${_file.extension} was closed without saving`
                    // }
                    // console.warn('pending implementation')
                  }
                },
                {
                  label: "Don't save",
                  type: "ghost",
                  keyShortcut: "d",
                  onClick: () => {
                    console.log("Don't save");
                    // addAlert({
                    //   id: _file.id,
                    //   message: `${_file.name}.${_file.extension} was closed without saving`,
                    //   type: "info",
                    //   durationInSec: 2
                    // })
                    msg = `${_file.name}.${_file.extension} was closed without saving`
                    close()
                    useDialog.getState().setDialog(undefined)
                    // console.warn('pending implementation')
                  }
                },
              ]
            })

          }
          // else if (files[i].contents.length > 0) {

          // }

          function close() {
            // closeFile(files[i])
            // set(state => ({
            //   files: state.files.filter(f => f.id != files[i].id)
            // }))

            get().pushFileHistory(_file)
            // 
            if (i === 0 && files.length === 1) {
              addNewFile()
            } else if (i === 0 && files.length > 1 && !file) {
              setFocusedFileId(files[i + 1].id)
            } else if (i > 0 && i === files.length - 1 && !file) {
              setFocusedFileId(files[i - 1].id)
            }
            // else if (file && focusedFileId) {
            //   setFocusedFileId(focusedFileId)
            // }

            set(state => ({
              files: state.files.filter(f => f.id != _file.id)
            }))

            addAlert({
              id: _file.id,
              message: msg ?? `${_file.name}.${_file.extension} was closed`,
              type: "info",
              // durationInSec: 3
            })
          }

          break
        }

        console.debug("Close the current tab");
      },

      async saveFile(file) {
        await save(file)
        return false
      },
      async saveFileAs() {
        return await saveAs()
        // return false
      },
      // async saveFile() {
      //   const fileId = get().focusedFileId
      //   if (!fileId) return false
      //   const file = get().getFileById(fileId)
      //   if (!file) return false
      //   let autoSaveFileDir = get().autoSaveFileDir

      //   let existsCounter = 0
      //   async function findNonExistPath() {
      //     const counter = existsCounter > 0 ? `(${existsCounter.toString().padStart(2, "0")})` : ''
      //     const filePath = `${autoSaveFileDir}/${file?.name}${counter}.${file?.extension}`
      //     let exists = await fs.exists(filePath)
      //     // console.log(
      //     //   await path.resolve(filePath)
      //     // )
      //     if (exists) {
      //       existsCounter++
      //       return findNonExistPath()
      //     }
      //     return filePath
      //   }


      //   if (autoSaveFileDir && get().autoSaveFile) {
      //     let path = await findNonExistPath()
      //     console.debug("save path", path)
      //     await fs.writeTextFile(path, file.contents)
      //     await get().updateFileContents({ ...file, saved: true })
      //     return true
      //   }

      //   let selectedPath = await dialog.save({
      //     title: "Save file",
      //     defaultPath: file.path,
      //     filters: [
      //       { name: "Text files", extensions: ["txt"] }
      //     ]
      //   })

      //   if (selectedPath) {
      //     // await fs.exists(selectedPath).then(async (exists) => {
      //     //   if (exists) {
      //     //     await dialog.message("File already exists")
      //     //     return
      //     //   }
      //     //   await fs.writeTextFile(selectedPath, file.contents)
      //     //   await get().updateFileContents({ ...file, saved: true, path: selectedPath })
      //     //   return true
      //     // })
      //     await fs.writeTextFile(selectedPath, file.contents)
      //     await get().updateFileContents({ ...file, saved: true, path: selectedPath })
      //     return true
      //   }

      //   return false
      // },
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
      toggleAutoSaveFile: async () => {
        let autoSaveFileDir = get().autoSaveFileDir
        if (!autoSaveFileDir || autoSaveFileDir.length <= 0) {
          await get().setAutoSaveFileDir()
          autoSaveFileDir = get().autoSaveFileDir
        }

        if (autoSaveFileDir && autoSaveFileDir.length > 0) {
          set(state => ({ autoSaveFile: !state.autoSaveFile }))
        }
      },
      autoSaveFileDir: null,
      setAutoSaveFileDir: async () => {
        let autoSaveFileDir = get().autoSaveFileDir

        // if (!autoSaveFileDir) {
        let newAutoSaveFileDir = await dialog.open({
          directory: true,
          multiple: false,
          title: "Select auto save file directory"
        })
        if (newAutoSaveFileDir) {
          autoSaveFileDir = newAutoSaveFileDir
          addAlert({
            id: "auto-save-file-dir",
            message: "Auto save file directory was set",
            type: "info",
            // durationInSec: 2
          })
          // set(_ => ({ autoSaveFileDir: newAutoSaveFileDir }))
          // return true
        } else {
          addAlert({
            id: "auto-save-file-dir",
            message: "Failed to select auto save file directory",
            type: "error",
            // durationInSec: 5
          })
        }
        // }
        set(_ => ({ autoSaveFileDir: autoSaveFileDir?.replace(/\//g, "\\") }))
      },

      cursorPosition: {
        line: 0,
        column: 0
      },
      updateCursorPosition: (cursorPosition) => set(_ => ({ cursorPosition }))
    }),
    {
      name: "use-file-system",
      storage: createJSONStorage(() => localStorage),
    }
  )
)


// useFileSystem.getState().addNewFile()
