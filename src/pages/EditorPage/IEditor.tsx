import { appWindow } from "@tauri-apps/api/window";
import * as monaco from "monaco-editor";
import { useEffect, useRef } from "react";
import {
  closeActiveTab,
  createNewTab,
  gotoNextTab,
  gotoPreviousTab,
  toggleFullscreen,
  updateWindowTitle,
} from "../../keyShortcuts";
import { useFileSystem } from "../../stores/useFileSystem";
import { useSettingStore } from "../../stores/useSettingStore";

export function IEditor() {
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
        value: "",
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
        linkedEditing: true, // rename on type
        scrollbar: {
          vertical: "auto",
          horizontal: "auto",
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
          arrowSize: 6,
          useShadows: false,
        },
      });

      // Listen to cursor position changes
      monacoInstance.current.onDidChangeCursorPosition(({ position }) => {
        updateCursorPosition({
          line: position.lineNumber,
          column: position.column,
        });
      });

      // Listen to value changes
      // monacoInstance.current.onDidChangeModelContent(() => {
      //   const value = monacoInstance.current?.getValue();
      //   console.log("Current value:", value);
      // });

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
      // const COMMA = monaco.KeyCode.Comma;

      // monacoInstance.current.addCommand(CTRLCMD | s, saveFile);
      // monacoInstance.current.addCommand(CTRLCMD | SHIFT | s, saveFileAs);
      monacoInstance.current.addCommand(ALT | z, toggleWordWrap);
      monacoInstance.current.addCommand(ALT | x, toggleLineNumber);
      monacoInstance.current.addCommand(CTRLCMD | SHIFT | m, toggleZenMode);
      monacoInstance.current.addCommand(CTRLCMD | ALT | t, toggleAlwaysOnTop);
      // monacoInstance.current.addCommand(CTRLCMD | COMMA, () => {
      //   debug("open settings");
      // });
      monacoInstance.current.addCommand(CTRLCMD | t, createNewTab);
      monacoInstance.current.addCommand(CTRLCMD | n, createNewTab);
      monacoInstance.current.addCommand(CTRLCMD | w, closeActiveTab);
      monacoInstance.current.addCommand(CTRLCMD | TAB, gotoNextTab);
      monacoInstance.current.addCommand(CTRLCMD | SHIFT | TAB, gotoPreviousTab);
      monacoInstance.current.addCommand(F11, toggleFullscreen);
    }

    (window as any).MonacoEnvironment = {
      getWorker(_: any) {
        return new Worker(
          new URL("monaco-editor/esm/vs/editor/editor.worker", import.meta.url)
        );
      },
    };

    return () => monacoInstance.current?.dispose();
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
    // console.debug({ theme });
  }, [showLineNumber, wordWrap, theme]);

  function handleEditorRerender() {
    // console.debug("rerender", { zenMode });
    monacoInstance.current?.layout({ height: 100, width: 100 }, true);
  }
  useEffect(handleEditorRerender, [zenMode]);
  appWindow.onResized(handleEditorRerender);

  return <div ref={editorRef} className="min-h-full min-w-full" />;
}
