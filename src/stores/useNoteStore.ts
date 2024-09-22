import { create } from "zustand";

declare global {
  type Note = {
    id: string;
    name: string;
    ext: string
    content: string;
    path: string;
    saved: boolean
  }
}

interface NoteStore {
  notes: Note[],
  loadNote?: (note: Note) => void
  addNote: () => Note
  updateNote: (id: string, updatedNote: Partial<Note>) => void
  removeNote: (id: string) => void
  getNoteById: (id: string) => Note | null
}

const initialNewNoteId = new Date().getTime().toString()
function generateRandomParagraph() {
  const loremIpsumWords = [
    "Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor",
    "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "Ut", "enim", "ad", "minim", "veniam", "quis",
    "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat",
    "Duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore",
    "eu", "fugiat", "nulla", "pariatur", "Excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt",
    "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
  ];

  const sentenceLength = Math.floor(Math.random() * 10000) + 10; // Random sentence length between 10 and 20 words
  let paragraph = "";

  for (let i = 0; i < sentenceLength; i++) {
    const randomIndex = Math.floor(Math.random() * loremIpsumWords.length);
    paragraph += loremIpsumWords[randomIndex] + " ";
  }

  // Capitalize the first letter and add a period at the end
  paragraph = paragraph.charAt(0).toUpperCase() + paragraph.slice(1).trim() + ".";

  return paragraph;
}

// // Example usage:
// console.log(generateRandomParagraph());


export const useNoteStore = create<NoteStore>()((set, get) => ({
  notes: [{
    id: initialNewNoteId,
    name: `Untitled-${initialNewNoteId}`,
    ext: 'txt',
    content: generateRandomParagraph(),
    path: '',
    saved: false
  }],
  loadNote(note) {
    set((state) => ({ notes: [...state.notes, note] }))
  },
  addNote() {
    const ID = (new Date().getTime()).toString()
    const NEW_NOTE: Note = {
      id: ID,
      name: `Untitled-${ID}`,
      ext: 'txt',
      content: generateRandomParagraph(),
      path: '',
      saved: false
    }
    set((state) => ({
      notes: [...state.notes, NEW_NOTE]
    }))
    return NEW_NOTE
  },
  updateNote(id, updatedNote) {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...updatedNote } : note
      ),
    }))
  },
  removeNote(id) {
    set((state) => ({
      notes: state.notes.filter((note) =>
        note.id != id
      ),
    }))
  },
  getNoteById(id) {
    for (let i = 0; i < get().notes.length; i++) {
      if (get().notes[i].id == id) {
        // console.log(get().notes[i])
        // console.log(get().notes[i])
        return get().notes[i]
      }
    }
    return null
  }
}))
