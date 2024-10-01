import { EDITOR_SHORTCUTS } from "@/constants/keyboard-shortcuts";
import { tauriWindow } from "@/services";
import { useFileSystem, useSettingStore } from "@/stores";
import * as monaco from "monaco-editor";
import { useEffect, useMemo, useRef, useState } from "react";

export function IEditor() {
  const { zenMode, showLineNumber, wordWrap, theme, hideEditorStats } =
    useSettingStore();
  const {
    files,
    focusedFileId,
    updateCursorPosition,
    updateFileContents,
    getFileById,
    renameFile,
  } = useFileSystem();

  const file = useMemo(() => {
    if (focusedFileId) return getFileById(focusedFileId);
  }, [focusedFileId, files]);

  const editorContainer = useRef<HTMLDivElement>(null);
  const [editorValue, setEditorValue] = useState(file?.contents ?? "");
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
        tabFocusMode: true,
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
        contextmenu: false,
        // padding: {
        //   left:5
        // }
      });

      // Listen to cursor position changes
      editorInstance.current.onDidChangeCursorPosition(({ position }) => {
        updateCursorPosition({
          line: position.lineNumber,
          column: position.column,
        });
        updateFileContents({
          id: focusedFileId,
          contents: editorInstance.current?.getValue() ?? "",
          saved: file?.contents === editorValue ? file?.saved : false,
        });
        editorInstance.current?.saveViewState();
      });

      // Listen to value changes
      editorInstance.current.onDidChangeModelContent(() => {
        setEditorValue(editorInstance.current?.getValue() ?? "");
        editorInstance.current?.saveViewState();
      });

      // monacoInstance.current.on

      // monacoInstance.current.onDidChangeCursorSelection(e => {
      //   // e.selection.
      // })
      for (let { keys, handler } of EDITOR_SHORTCUTS) {
        editorInstance.current.addCommand(keys, handler);
      }

      editorInstance.current.focus();
    }

    return () => editorInstance.current?.dispose();
  }, [editorContainer]);

  useEffect(() => {
    if (focusedFileId) {
      updateFileContents({
        id: focusedFileId,
        contents: editorValue,
        saved: file?.contents === editorValue ? file?.saved : false,
        // contents: file?.contents ?? "",
        // saved: file?.contents === editorValue ? file?.saved : false,
      });

      // const file = getFileById(focusedFileId);
      if (file && file.path.length <= 0 && !file.saved) {
        let fileName = "Untitled";
        for (let line of editorValue.split("\n")) {
          line = line.trim();
          if (line.length > 0) {
            fileName = line.slice(0, 50);
            break;
          }
        }

        // let fileName = editorValue.split("\n")[0];
        // if (fileName.length <= 0) {
        //   fileName = "Untitled";
        // }

        renameFile({
          id: focusedFileId,
          newName: fileName,
        });
      }
    }
  }, [editorValue]);

  // update editor content on tab change
  useEffect(() => {
    if (!focusedFileId) return;

    // const newValue = getFileById(focusedFileId)?.contents || "";
    const newValue = file?.contents || "";
    setEditorValue(newValue);

    if (editorInstance.current) {
      const editorInstance = monaco.editor.getModels()[0]; // Get current editor model
      if (editorInstance) {
        editorInstance.setValue(newValue); // Update editor value
      }
    }
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
    editorInstance.current?.layout(undefined, false);
  }
  useEffect(handleEditorRerender, [zenMode, hideEditorStats]);
  tauriWindow.onResized(handleEditorRerender);

  return (
    <div
      ref={editorContainer}
      className=" transition-none min-h-full min-w-full"
    />
  );
}
