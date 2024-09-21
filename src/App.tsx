import { appWindow } from "@tauri-apps/api/window";
import { X } from "lucide-react";
import * as monaco from "monaco-editor";
import { useEffect, useMemo, useRef, useState } from "react";
import { saveAsFile } from "./fs";
import {
  closeActiveTab,
  createNewTab,
  gotoNextTab,
  gotoPreviousTab,
  toggleFullscreen,
  toggleLineNumber,
  toggleLineWrap,
  toggleTabs,
  updateWindowTitle,
} from "./keyShortcuts";
import { useNoteStore } from "./store/useNoteStore";
import { useSharedStore } from "./store/useSharedStore";

const debug = console.debug;

const KeyboardShortcuts = [
  {
    keyCombination: "ALT + z",
    action: "toggle line wrap",
  },
  {
    keyCombination: "ALT + x",
    action: "toggle line number",
  },
  {
    keyCombination: "ALT + x",
    action: "toggle line number",
  },
];

appWindow.onFileDropEvent((e) => {
  console.log(e);
});

function App() {
  const zenMode = useSharedStore((state) => state.showTabs);

  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col w-screen h-screen bg-zinc-800 transition-all text-slate-200">
      {/* <div className="flex flex-col gap-4 p-2 px-3">
        <h1 className="text-2xl">Keyboard Shortcuts</h1>

        <div className="flex gap-3">
          <kbd className="text-sm font-mono">CTRL + d</kbd>
          <span className="text-sm">Duplicate line</span>
        </div>
      </div> */}
      {zenMode && <Header />}
      <div className="flex-1">
        <NotepadEditor />
      </div>
      {zenMode && <Footer />}
    </div>
  );
}

function NotepadEditor() {
  const {
    activeNoteId,
    showLineNumber,
    wordWrap,
    showTabs,
    showFooter,
    updateCursorPosition,
    toggleAlwayOnTop,
  } = useSharedStore();
  const { getNoteById } = useNoteStore();

  const editorRef = useRef<HTMLDivElement>(null);
  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );

  useEffect(() => {
    if (editorRef.current) {
      monacoInstance.current = monaco.editor.create(editorRef.current, {
        value: "",
        automaticLayout: true,
        language: "plaintext",
        lineNumbers: showLineNumber ? "on" : "off",
        largeFileOptimizations: true,
        glyphMargin: false,
        folding: false,
        lineDecorationsWidth: 0,
        minimap: {
          enabled: false,
        },
        theme: "vs-dark",
        wordWrap,
        wrappingStrategy: "advanced",
        stickyScroll: {
          enabled: false,
        },
        smoothScrolling: true,
        maxTokenizationLineLength: 1000,
        // linkedEditing: true // rename on type
        scrollbar: {
          vertical: "auto", // or 'auto', 'hidden'
          horizontal: "auto", // or 'auto', 'hidden'
          // vertical: "auto", // or 'auto', 'hidden'
          // horizontal: "auto", // or 'auto', 'hidden'
          verticalScrollbarSize: 6, // height of vertical scrollbar
          horizontalScrollbarSize: 6, // width of horizontal scrollbar
          arrowSize: 6, // size of scroll arrows
          useShadows: false, // disables shadow effect
        },
      });

      monacoInstance.current.onDidChangeCursorPosition((e) => {
        updateCursorPosition(e.position.lineNumber, e.position.column);
      });

      // monacoInstance.current.onDidChangeCursorSelection(e => {
      //   // e.selection.
      // })

      const CTRLCMD = monaco.KeyMod.CtrlCmd;
      const SHIFT = monaco.KeyMod.Shift;
      const ALT = monaco.KeyMod.Alt;
      const TAB = monaco.KeyCode.Tab;
      const F11 = monaco.KeyCode.F11;
      const t = monaco.KeyCode.KeyT;
      // const f = monaco.KeyCode.KeyF;
      // const n = monaco.KeyCode.KeyN;
      const w = monaco.KeyCode.KeyW;
      const s = monaco.KeyCode.KeyS;
      const z = monaco.KeyCode.KeyZ;
      const x = monaco.KeyCode.KeyX;
      const m = monaco.KeyCode.KeyM;
      const COMMA = monaco.KeyCode.Comma;

      // monacoInstance.current.addCommand(CTRLCMD | s, () => debug("save"));
      monacoInstance.current.addCommand(CTRLCMD | s, saveAsFile);
      monacoInstance.current.addCommand(CTRLCMD | SHIFT | s, () =>
        debug("save as")
      );
      // monacoInstance.current.addCommand(CTRLCMD | n, () => debug("new window"));
      monacoInstance.current.addCommand(ALT | z, toggleLineWrap);
      monacoInstance.current.addCommand(ALT | x, toggleLineNumber);
      // monacoInstance.current.addCommand(ALT | t, toggleTabs);
      // monacoInstance.current.addCommand(ALT | f, toggleFooter);
      monacoInstance.current.addCommand(CTRLCMD | SHIFT | m, toggleTabs);
      monacoInstance.current.addCommand(CTRLCMD | SHIFT | t, toggleAlwayOnTop);
      monacoInstance.current.addCommand(CTRLCMD | COMMA, () =>
        debug("open settings")
      );
      monacoInstance.current.addCommand(CTRLCMD | t, createNewTab);
      monacoInstance.current.addCommand(CTRLCMD | w, closeActiveTab);
      monacoInstance.current.addCommand(CTRLCMD | TAB, gotoNextTab);
      monacoInstance.current.addCommand(CTRLCMD | SHIFT | TAB, gotoPreviousTab);
      monacoInstance.current.addCommand(F11, toggleFullscreen);
    }

    return () => {
      monacoInstance.current?.dispose();
    };
  }, []);

  // update editor content on tab change
  useEffect(() => {
    if (!monacoInstance.current || !activeNoteId) return;
    // debug(getNoteById(activeNoteId)?.content, activeNoteId);
    const value = getNoteById(activeNoteId)?.content ?? "";
    monacoInstance.current.setValue(value);
    updateWindowTitle(getNoteById(activeNoteId)?.name ?? "notepad+");
  }, [activeNoteId]);

  // toggle line
  useEffect(() => {
    monacoInstance.current?.updateOptions({
      lineNumbers:
        // monacoInstance.current.getOption(monaco.editor.EditorOption.lineNumbers)
        //   .renderType === 0 // 0 means off
        showLineNumber ? "on" : "off",
      lineDecorationsWidth:
        // monacoInstance.current?.getOption(
        //   monaco.editor.EditorOption.lineDecorationsWidth
        // ) == 0
        showLineNumber ? undefined : 0,
    });
  }, [showLineNumber]);

  // toggle line wrap
  useEffect(() => {
    monacoInstance.current?.updateOptions({
      wordWrap,
    });
    // monacoInstance.current.getOption(
    //   monaco.editor.EditorOption.wordWrap
    // ) === "off"
    // ? "on" : "off",
  }, [wordWrap]);

  useEffect(() => {
    monacoInstance.current?.layout(
      {
        height: 100,
        width: 100,
      },
      true
    );
  }, [showTabs, showFooter]);

  appWindow.onResized(() => {
    monacoInstance.current?.layout(
      {
        height: 100,
        width: 100,
      },
      true
    );
  });

  return <div ref={editorRef} className="min-h-full min-w-full" />;
}

function Header() {
  const { activeNoteId, setActiveNoteId } = useSharedStore();
  const { notes, removeNote } = useNoteStore();
  return (
    <div className="w-full">
      <div className={`flex flex-1 overflow-x-scroll w-full no-scrollbar`}>
        {notes.map((note) => (
          <Tab
            key={note.id}
            name={note.name}
            saved={note.saved}
            active={note.id === activeNoteId}
            onClick={() => setActiveNoteId(note.id)}
            onClose={() => removeNote(note.id)}
          />
        ))}
      </div>
    </div>
  );
}

function Footer() {
  const { activeNoteId, cursorPosition } = useSharedStore();
  const { getNoteById } = useNoteStore();

  const { characterCount, wordCount, lineCount } = useMemo(() => {
    let noteContent = "";
    if (activeNoteId) {
      noteContent = getNoteById(activeNoteId)?.content || "";
    }

    const characterCount = noteContent.length;
    const wordCount = noteContent.trim().split(/\s+/).length;
    const lineCount = noteContent.split("\n").length;

    return {
      characterCount,
      wordCount,
      lineCount,
    };
  }, [activeNoteId]);

  return (
    <div className="flex justify-between overflow-hidden overflow-x-scroll no-scrollbar w-full min-h-5">
      <BottomTab
        name={`line ${cursorPosition.lineNumber} col ${cursorPosition.columnNumber}`}
      />

      <div className="flex">
        <BottomTab
          name={`${lineCount} line${(lineCount || 0) > 1 ? "s" : ""}`}
        />
        <BottomTab
          name={`${wordCount} word${(wordCount || 0) > 1 ? "s" : ""}`}
        />
        <BottomTab
          name={`${characterCount} character${
            (characterCount || 0) > 1 ? "s" : ""
          }`}
        />
        <BottomTab name={`auto-save: off`} />
        <BottomTab name={`theme: light`} />
      </div>
    </div>
  );
}

export default App;

type TabProps = {
  name: string;
  active: boolean;
  saved: boolean;
  onClick: () => void;
  onClose: () => void;
};
function Tab({ name, active, saved, onClick, onClose }: TabProps) {
  return (
    <span
      className={`flex font-medium hover:bg-zinc-700 justify-between items-center px-2 text-slate-200 text-sm group cursor-pointer transition-all duration-500 select-none min-w-20 ${
        active && "bg-zinc-700"
      }`}
      onClick={onClick}
    >
      <span className="overflow-hidden text-clip text-xs whitespace-nowrap py-1.5">
        {name}
        {!saved && "*"}
      </span>
      <X className="text-slate-300 hidden group-hover:flex" onClick={onClose} />
    </span>
  );
}

type BottomTabProps = {
  name: string;
  onClick?: () => void;
};
function BottomTab({ name, onClick }: BottomTabProps) {
  return (
    <span
      className={`flex min-w-fit items-end hover:bg-zinc-700 justify-between px-2 p-1 gap-1 text-slate-200 text-xs group cursor-pointer transition-all select-none`}
      onClick={onClick}
    >
      <span>{name}</span>
    </span>
  );
}
