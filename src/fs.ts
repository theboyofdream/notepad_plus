import { open, save } from '@tauri-apps/api/dialog';
import { exists, readTextFile, renameFile, writeTextFile } from '@tauri-apps/api/fs';
import { basename } from '@tauri-apps/api/path';
import { useNoteStore } from './store/useNoteStore';
import { useSharedStore } from './store/useSharedStore';

const { debug } = console


export async function selectFolder() {
  const selectedPath = await open({
    directory: true,
    multiple: false,
  });

  if (selectedPath) {
    console.log('Selected folder:', selectedPath);
    return selectedPath as string;
  } else {
    console.log('No folder selected');
    return null;
  }
}


export async function saveFile(filePath: string, content: string) {
  if (filePath) {
    await writeTextFile(filePath, content);
    console.log('File saved successfully');
  }
}


export async function saveAsFile() {
  const activeNoteId = useSharedStore.getState().activeNoteId
  if (!activeNoteId) return
  const note = useNoteStore.getState().getNoteById(activeNoteId)
  if (!note) return

  debug(activeNoteId, note)

  const filePath = await save({
    defaultPath: note.name,
    title: "Save Note",
    filters: [{
      name: "Text documents",
      extensions: ['txt']
    }]
  });

  debug(filePath)

  if (filePath) {
    await writeTextFile(filePath, note.content);
    console.log('File saved successfully');
    useNoteStore.getState().updateNote(activeNoteId, { saved: true })
    return true
  }

  return false
}


export async function readFile(filePath: string) {
  const contents = await readTextFile(filePath);
  console.log('File contents:', contents);
  return contents;
}


export async function openFile() {
  const selected = await open({
    multiple: false,
    filters: [
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });

  if (selected === null) {
    console.log('No file selected');
    return null;
  }

  const filepath = selected as string;
  const filename = await basename(filepath);
  const content = await readTextFile(filepath);

  console.log('File opened successfully:', filepath);

  return {
    filepath,
    filename,
    content
  };
}


export async function renameOpenedFile(oldPath: string, newPath: string) {
  await renameFile(oldPath, newPath)
  return exists(newPath)
}
