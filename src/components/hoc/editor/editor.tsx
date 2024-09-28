import { EDITOR_SHORTCUTS } from "@/constants/keyboard-shortcuts";
import { useFileSystem, useSettingStore } from "@/stores";
import { appWindow } from "@tauri-apps/api/window";
import * as monaco from "monaco-editor";
import { useEffect, useRef, useState } from "react";

console.clear();

// Setting up the worker environment for plain text
// window.MonacoEnvironment = {
//   getWorkerUrl: function (workerId, label) {
//     if (label === "plaintext") {
//       return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
//         self.MonacoEnvironment = {
//           baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/'
//         };
//         importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs/base/worker/workerMain.js');
//       `)}`;
//     }
//     return "";
//   },
// };

export function IEditor() {
  const { zenMode, showLineNumber, wordWrap, theme } = useSettingStore();
  const {
    focusedFileId,
    updateCursorPosition,
    updateFileContents,
    getFileById,
  } = useFileSystem();

  const editorContainer = useRef<HTMLDivElement>(null);
  const [editorValue, setEditorValue] = useState("");
  const editorInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );

  useEffect(() => {
    if (editorContainer.current) {
      editorInstance.current = monaco.editor.create(editorContainer.current, {
        value: editorValue,
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
      editorInstance.current.onDidChangeCursorPosition(({ position }) => {
        updateCursorPosition({
          line: position.lineNumber,
          column: position.column,
        });
      });

      // Listen to value changes
      editorInstance.current.onDidChangeModelContent(() => {
        setEditorValue(editorInstance.current?.getValue() ?? "");
      });

      // monacoInstance.current.on

      // monacoInstance.current.onDidChangeCursorSelection(e => {
      //   // e.selection.
      // })
      for (let { keys, handler } of EDITOR_SHORTCUTS) {
        editorInstance.current.addCommand(keys, handler);
      }

      // const CTRLCMD = monaco.KeyMod.CtrlCmd;
      // const SHIFT = monaco.KeyMod.Shift;
      // const ALT = monaco.KeyMod.Alt;
      // const TAB = monaco.KeyCode.Tab;
      // const F11 = monaco.KeyCode.F11;
      // const t = monaco.KeyCode.KeyT;
      // // const f = monaco.KeyCode.KeyF;
      // const n = monaco.KeyCode.KeyN;
      // const w = monaco.KeyCode.KeyW;
      // // const s = monaco.KeyCode.KeyS;
      // const z = monaco.KeyCode.KeyZ;
      // const x = monaco.KeyCode.KeyX;
      // const m = monaco.KeyCode.KeyM;
      // // const COMMA = monaco.KeyCode.Comma;

      // // monacoInstance.current.addCommand(CTRLCMD | s, saveFile);
      // // monacoInstance.current.addCommand(CTRLCMD | SHIFT | s, saveFileAs);
      // monacoInstance.current.addCommand(ALT | z, toggleWordWrap);
      // monacoInstance.current.addCommand(ALT | x, toggleLineNumber);
      // monacoInstance.current.addCommand(CTRLCMD | SHIFT | m, toggleZenMode);
      // monacoInstance.current.addCommand(CTRLCMD | ALT | t, toggleAlwaysOnTop);
      // // monacoInstance.current.addCommand(CTRLCMD | COMMA, () => {
      // //   debug("open settings");
      // // });
      // monacoInstance.current.addCommand(CTRLCMD | t, createNewTab);
      // monacoInstance.current.addCommand(CTRLCMD | n, createNewTab);
      // monacoInstance.current.addCommand(CTRLCMD | w, closeActiveTab);
      // monacoInstance.current.addCommand(CTRLCMD | TAB, gotoNextTab);
      // monacoInstance.current.addCommand(CTRLCMD | SHIFT | TAB, gotoPreviousTab);
      // monacoInstance.current.addCommand(F11, toggleFullscreen);
    }

    return () => editorInstance.current?.dispose();
  }, [editorContainer]);

  useEffect(() => {
    if (focusedFileId) {
      updateFileContents({
        id: focusedFileId,
        contents: editorValue,
      });
    }
  }, [editorValue]);

  // update editor content on tab change
  useEffect(() => {
    if (!focusedFileId) return;

    const newValue = getFileById(focusedFileId)?.contents || "";
    setEditorValue(newValue);

    if (editorInstance.current) {
      const editorInstance = monaco.editor.getModels()[0]; // Get current editor model
      if (editorInstance) {
        editorInstance.setValue(newValue); // Update editor value
      }
    }
    // // updateWindowTitle(focusedFile.name ?? "notepad+");
  }, [focusedFileId]);

  // toggle line/word wrap
  useEffect(() => {
    editorInstance.current?.updateOptions({
      lineNumbers: showLineNumber ? "on" : "off",
      lineDecorationsWidth: showLineNumber ? undefined : 0,
      wordWrap: wordWrap ? "on" : "off",
      theme,
    });
    // console.debug({ theme });
  }, [showLineNumber, wordWrap, theme]);

  function handleEditorRerender() {
    // console.debug("rerender", { zenMode });
    editorInstance.current?.layout({ height: 100, width: 100 }, true);
  }
  useEffect(handleEditorRerender, [zenMode]);
  appWindow.onResized(handleEditorRerender);

  return <div ref={editorContainer} className="min-h-full min-w-full" />;
}
