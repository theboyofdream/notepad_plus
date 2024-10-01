import { extractFileInfoFromPath, isFile } from "@/helpers"
import { dialog, fs } from "@/services"
import { useAlerts } from "./useAlerts"
import { useFileSystem } from "./useFileSystem"

const get = () => useFileSystem.getState()
const { addAlert } = useAlerts.getState()

export async function save(file?: IFile) {

  const id = get().focusedFileId
  if (!file && !id) return

  let _file = file
  if (!_file && id) {
    let r = get().getFileById(id)
    if (!r) return
    _file = r
  }

  // const _file = file || get().getFileById(id)
  if (!_file) return

  const saveAndUpdateState = async (path: string) => {
    path = path.replace(/\//g, "\\")
    let __file = _file
    console.log(path, _file);
    // const isFile = (await fs.lstat(path)).isFile
    if (isFile(path)) {
      const { name, extension } = extractFileInfoFromPath(path)
      __file = { ..._file, path, name, extension }
    }
    // console.log({ _file });

    await fs.writeTextFile(path, __file.contents)
      .then(() => {
        addAlert({
          id: __file.id,
          message: `${__file.name}.${__file.extension} was saved`,
          type: "info",
          // durationInSec: 2
        })
      }).catch((err) => {
        addAlert({
          id: __file.id,
          message: `Unable to save ${__file.name}.${__file.extension}\nError: ${err}`,
          type: "error",
          // durationInSec: 5
        })
      })
    get().updateFileContents({ ...__file, saved: true, path })

  }

  const findNonExistPath = async (basePath: string) => {
    let existsCounter = 0
    let nonExistPath = null
    let path = basePath.replace(/\//g, "\\")
    while (!nonExistPath) {
      const counter = existsCounter > 0 ? ` (${existsCounter.toString().padStart(2, '0')})` : ""
      if (isFile(path) && !await fs.exists(path)) {
        return path
      }
      const newFilePath = `${basePath}\\${_file.name}${counter}.${_file.extension}`
      if (!await fs.exists(newFilePath)) {
        nonExistPath = newFilePath
        break
      }
      existsCounter++
    }
    return nonExistPath
  }

  const { autoSaveFile, autoSaveFileDir } = get()
  if (autoSaveFile && autoSaveFileDir && autoSaveFileDir.length > 0) {
    let path = ""
    if (_file.path.length > 0) {
      path = _file.path
    } else {
      path = await findNonExistPath(autoSaveFileDir)
    }
    saveAndUpdateState(path)
    return
  }

  if (_file.path.length > 0) {
    saveAndUpdateState(_file.path)
    return
  }

  // useDialog.getState()
  let selectedPath = await dialog.save({
    title: `Save ${_file.name}.${_file.extension}`,
    defaultPath: `${_file.path}\\${_file.name}.${_file.extension}`,
    filters: [
      { name: "plaintext", extensions: ["txt"] }
    ]
  })
  if (!selectedPath) return
  // selectedPath = selectedPath.replace(/\//g, "\\")
  let nonExistPath = await findNonExistPath(selectedPath)

  saveAndUpdateState(nonExistPath)

}

export async function saveAs() {
  const id = get().focusedFileId
  if (!id) return false
  const file = get().getFileById(id)
  if (!file) return false

  let isSaved = false

  const saveAndUpdateState = async (path: string) => {
    path = path.replace(/\//g, "\\")
    let _file = file
    console.log(path, file);
    // const isFile = (await fs.lstat(path)).isFile
    if (isFile(path)) {
      const { name, extension } = extractFileInfoFromPath(path)
      _file = { ...file, path, name, extension }
    }
    console.log({ _file });

    await fs.writeTextFile(path, _file.contents)
      .then(() => {
        get().updateFileContents({ ..._file, saved: true, path })
        addAlert({
          id: _file.id,
          message: `${_file.name}.${_file.extension} was saved`,
          type: "info",
          // durationInSec: 2
        })
        isSaved = true
      }).catch((err) => {
        addAlert({
          id: _file.id,
          message: `Unable to save ${_file.name}.${_file.extension}\nError: ${err}`,
          type: "error",
          // durationInSec: 5
        })
        isSaved = false
      })

  }

  // useDialog.getState()
  let selectedPath = await dialog.save({
    title: `Save ${file.name}.${file.extension}`,
    defaultPath: `${file.path}\\${file.name}.${file.extension}`,
    filters: [
      { name: "plaintext", extensions: ["txt"] }
    ]
  })
  if (!selectedPath) {
    addAlert({
      id: "save-as",
      message: "Unable to save file.",
      type: "error",
      // durationInSec: 5
    })
    // await dialog.message("Please select a path to save the file.", {
    //   kind: "error"
    // })
    return false
  }

  console.debug(selectedPath)

  saveAndUpdateState(selectedPath)
  return isSaved
}


export async function open() {
  let selectedPath = await dialog.open({
    title: `Select file to open`,
    filters: [
      { name: "plaintext", extensions: ["txt"] }
    ]
  })

  if (!selectedPath) {
    addAlert({
      id: "open-file",
      message: "Unable to open file.",
      type: "error",
      // durationInSec: 5
    })
    return
  }
  const file = await fs.readTextFile(selectedPath)
  const { name, extension } = extractFileInfoFromPath(selectedPath)
  const _file: IFile = { id: `${new Date().getTime()}`, name, extension, contents: file, path: selectedPath, saved: true }
  useFileSystem.getState().addFile(_file)
  console.log({ file });
} 
