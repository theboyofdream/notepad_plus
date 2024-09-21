import { appWindow } from '@tauri-apps/api/window';
import { useNoteStore } from "./store/useNoteStore";
import { useSharedStore } from "./store/useSharedStore";


const { debug } = console

export function gotoNextTab() {
  debug("next tab");
  const { activeNoteId, setActiveNoteId } = useSharedStore.getState();
  if (!activeNoteId) return;
  const notes = useNoteStore.getState().notes;
  for (let i = 0; i <= notes.length; i++) {
    if (notes[i].id == activeNoteId) {
      if (notes.length === i + 1) {
        setActiveNoteId(notes[0].id);
      } else {
        setActiveNoteId(notes[i + 1].id);
      }
      break;
    }
  }
}
export function gotoPreviousTab() {
  debug("previous tab");
  const { activeNoteId, setActiveNoteId } = useSharedStore.getState();
  if (!activeNoteId) return;
  const notes = useNoteStore.getState().notes;
  for (let i = 0; i <= notes.length; i++) {
    if (notes[i].id == activeNoteId) {
      if (i === 0) {
        setActiveNoteId(notes[notes.length - 1].id);
      } else if (i > 0) {
        setActiveNoteId(notes[i - 1].id);
      }
      break;
    }
  }
}

export async function closeActiveTab() {
  debug("close tab");
  const { activeNoteId, setActiveNoteId } = useSharedStore.getState();
  if (!activeNoteId) return;
  const { notes, addNote, removeNote } = useNoteStore.getState();
  for (let i = 0; i <= notes.length; i++) {
    if (notes[i].id != activeNoteId) {
      continue;
    }
    if (!notes[i].saved) {
      // const save = await dialog.confirm(
      //   `Do you want to save changes to ${notes[i].name}.${notes[i].ext}`,
      //   {
      //     title: 'Unsaved changes',
      //     type: "warning"
      //   }
      // )
    }
    if (i === 0 && notes.length === 1) {
      setActiveNoteId(
        addNote().id
      )
    } else if (i === 0 && notes.length > 1) {
      setActiveNoteId(notes[i + 1].id);
    } else if (notes.length === i + 1) {
      setActiveNoteId(notes[i - 1].id);
    }
    break;
  }
  removeNote(activeNoteId);
}

export function createNewTab() {
  debug("new tab");
  useSharedStore.getState().setActiveNoteId(
    useNoteStore.getState().addNote().id
  );
}

export function toggleLineNumber() {
  debug("toggle line number");
  useSharedStore.getState().toggleLineNumber()
}

export function toggleLineWrap() {
  debug("toggle line wrap");
  useSharedStore.getState().toggleWordWrap();
}

export function toggleTabs() {
  debug('toggle tabs')
  useSharedStore.getState().toggleTabsVisibility()
}

export function toggleFooter() {
  debug('toggle tabs')
  useSharedStore.getState().toggleFooterVisibility()
}

export async function toggleFullscreen(): Promise<void> {
  let isFullscreen = await appWindow.isFullscreen();
  debug(`Fullscreen mode ${!isFullscreen ? 'enabled' : 'disabled'}`);
  await appWindow.setFullscreen(!isFullscreen);
  isFullscreen = await appWindow.isFullscreen();
  debug(`Fullscreen mode ${!isFullscreen ? 'enabled' : 'disabled'}`);
}

export async function updateWindowTitle(newTitle: string): Promise<void> {
  await appWindow.setTitle(newTitle);
  debug(`Window title updated to: ${newTitle}`);
}
