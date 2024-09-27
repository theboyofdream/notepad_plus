import { appWindow } from "@tauri-apps/api/window";
import { X } from "lucide-react";
import * as monaco from "monaco-editor";
import { useEffect, useMemo, useRef } from "react";
import {
  closeActiveTab,
  createNewTab,
  gotoNextTab,
  gotoPreviousTab,
  toggleFullscreen,
  updateWindowTitle,
} from "../../keyShortcuts";
import { debug } from "../../lib/console";
import { useFileSystem } from "../../stores/useFileSystem";
import { useNoteStore } from "../../stores/useNoteStore";
import { useSettingStore } from "../../stores/useSettingStore";
import { useSharedStore } from "../../stores/useSharedStore";

export function Editor() {
  const zenMode = useSettingStore((state) => state.zenMode);
  return (
    <>
      {zenMode && <Header />}
      <NotepadEditor />
      {zenMode && <Footer />}
    </>
  );
}

function NotepadEditor() {
  const {
    zenMode,
    showLineNumber,
    wordWrap,
    theme,
    toggleAlwaysOnTop,
    toggleLineNumber,
    toggleWordWrap,
    toggleZenMode,
  } = useSettingStore();
  const { focusedFile, updateCursorPosition } = useFileSystem();

  const editorRef = useRef<HTMLDivElement>(null);
  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );

  useEffect(() => {
    if (editorRef.current) {
      monacoInstance.current = monaco.editor.create(editorRef.current, {
        value:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur a excepturi magnam ea ad qui libero optio necessitatibus cum rerum corrupti architecto laborum neque placeat molestias exercitationem labore, velit error?",
        automaticLayout: true,
        language: "plaintext",
        lineNumbers: "off",
        largeFileOptimizations: true,
        glyphMargin: false,
        folding: false,
        lineDecorationsWidth: 0,
        minimap: {
          enabled: false,
        },
        theme: "vs-dark",
        wordWrap: "off",
        wrappingStrategy: "advanced",
        stickyScroll: {
          enabled: false,
        },
        smoothScrolling: true,
        maxTokenizationLineLength: 1000,
        // linkedEditing: true // rename on type
        scrollbar: {
          vertical: "auto",
          horizontal: "auto",
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
          arrowSize: 6,
          useShadows: false,
        },
      });

      monacoInstance.current.onDidChangeCursorPosition(({ position }) => {
        updateCursorPosition({
          line: position.lineNumber,
          column: position.column,
        });
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
      const n = monaco.KeyCode.KeyN;
      const w = monaco.KeyCode.KeyW;
      // const s = monaco.KeyCode.KeyS;
      const z = monaco.KeyCode.KeyZ;
      const x = monaco.KeyCode.KeyX;
      const m = monaco.KeyCode.KeyM;
      const COMMA = monaco.KeyCode.Comma;

      // monacoInstance.current.executeCommand(null);
      // monacoInstance.current.executeCommand(
      //   null,
      //   monaco.editor.
      // );

      // setTimeout(
      //   () =>
      //     monacoInstance.current?.trigger(
      //       undefined,
      //       "editor.action.selectAll",
      //       null
      //     ),
      //   5000
      // );

      // monacoInstance.current.addCommand(CTRLCMD | s, saveFile);
      // monacoInstance.current.addCommand(CTRLCMD | SHIFT | s, saveFileAs);
      monacoInstance.current.addCommand(ALT | z, toggleWordWrap);
      monacoInstance.current.addCommand(ALT | x, toggleLineNumber);
      monacoInstance.current.addCommand(CTRLCMD | SHIFT | m, toggleZenMode);
      monacoInstance.current.addCommand(CTRLCMD | ALT | t, toggleAlwaysOnTop);
      monacoInstance.current.addCommand(CTRLCMD | COMMA, () =>
        debug("open settings")
      );
      monacoInstance.current.addCommand(CTRLCMD | t, createNewTab);
      monacoInstance.current.addCommand(CTRLCMD | n, createNewTab);
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
    if (!monacoInstance.current || !focusedFile?.id) {
      return;
    }
    // monacoInstance.current.setValue(focusedFile.contents);
    updateWindowTitle(focusedFile.name ?? "notepad+");
  }, [focusedFile]);

  // toggle line/word wrap
  useEffect(() => {
    monacoInstance.current?.updateOptions({
      lineNumbers: showLineNumber ? "on" : "off",
      lineDecorationsWidth: showLineNumber ? undefined : 0,
      wordWrap: wordWrap ? "on" : "off",
      theme,
    });
    debug({ theme });
  }, [showLineNumber, wordWrap, theme]);

  function handleEditorRerender() {
    monacoInstance.current?.layout(
      {
        height: 100,
        width: 100,
      },
      true
    );
  }
  useEffect(handleEditorRerender, [zenMode]);
  appWindow.onResized(handleEditorRerender);

  return <div ref={editorRef} className="min-h-full min-w-full flex-1" />;
}

function Header() {
  const { files, focusedFile, setFocusedFile, closeFile } = useFileSystem();

  return (
    <div className="w-full">
      <div className={`flex flex-1 overflow-x-scroll w-full no-scrollbar`}>
        {files.map((file) => (
          <Tab
            key={file.id}
            name={file.name}
            saved={file.saved}
            active={file.id === focusedFile?.id}
            onClick={() => setFocusedFile(file)}
            onClose={() => closeFile(file)}
          />
        ))}
      </div>
    </div>
  );
}

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

function Footer() {
  const { activeNoteId, cursorPosition } = useSharedStore();
  const { getNoteById } = useNoteStore();
  const { theme, updateTheme } = useSettingStore();

  const { characterCount, wordCount, lineCount } = useMemo(() => {
    let noteContent = "";
    if (activeNoteId) {
      noteContent = getNoteById(activeNoteId)?.content || "";
    }

    const characterCount = noteContent.length;
    const wordCount = noteContent.trim().split(/\s+/).length;
    const lineCount = noteContent.split("\n").length;

    debug(theme);
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
        <BottomTab
          name={`theme: ${theme.replace("vs-", "")}`}
          onClick={() => {
            debug({ theme });
            updateTheme(theme === "vs-dark" ? "vs-light" : "vs-dark");
          }}
        />
      </div>
    </div>
  );
}

type BottomTabProps = {
  name: string;
  onClick?: () => void;
};
function BottomTab({ name, onClick }: BottomTabProps) {
  return (
    <button
      className={`flex min-w-fit items-end hover:bg-zinc-700 justify-between px-2 p-1 gap-1 text-slate-200 text-xs group cursor-pointer transition-all select-none`}
      onClick={onClick}
    >
      <span>{name}</span>
    </button>
  );
}
