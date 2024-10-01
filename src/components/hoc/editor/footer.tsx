import { useContextMenu, useFileSystem, useSettingStore } from "@/stores";
import { useEffect, useMemo, useRef } from "react";

interface BottomTabProps {
  name: string;
  onClick?: () => void;
}
function BottomTab({ name, onClick }: BottomTabProps) {
  return (
    <button
      className={`flex min-w-fit items-end justify-between px-2 p-1 gap-1 text-current text-xs group cursor-pointer transition-all select-none hover`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export function EditorFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const {
    files,
    focusedFileId,
    getFileById,
    cursorPosition,
    autoSaveFile,
    toggleAutoSaveFile,
  } = useFileSystem();
  const { theme, updateTheme, editorStats } = useSettingStore();

  const { characterCount, wordCount, lineCount } = useMemo(() => {
    let noteContent = "";
    if (focusedFileId) {
      noteContent = getFileById(focusedFileId)?.contents || "";
    }

    const characterCount = noteContent.length;
    const wordCount =
      noteContent.trim() === "" ? 0 : noteContent.trim().split(/\s+/).length;
    const lineCount = noteContent.split("\n").length;

    return {
      characterCount,
      wordCount,
      lineCount,
    };
  }, [focusedFileId, cursorPosition, files]);

  useEffect(() => {
    function onRightClick(e: MouseEvent) {
      e.stopPropagation();
      e.preventDefault();

      // console.log(window.innerWidth, e.clientX);

      // useEditorStats
      //   .getState()
      //   .setClickPosition({ x: e.clientX, y: e.clientY });
      // useEditorStats.getState().open();
      useContextMenu.getState().setOpenedMenu({
        menuName: "editor-footer",
        clickPosition: { x: e.clientX, y: e.clientY },
      });
      // console.log("right click", e.clientX, e.clientY);
    }

    ref.current?.addEventListener("contextmenu", onRightClick);

    return () => {
      ref.current?.removeEventListener("contextmenu", onRightClick);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="flex justify-between overflow-hidden overflow-x-scroll no-scrollbar w-full h-5"
    >
      <span>
        {editorStats.cursorPosition && (
          <BottomTab
            name={`line ${cursorPosition.line} col ${cursorPosition.column}`}
          />
        )}
      </span>

      <div className="flex">
        {editorStats.totalLines && (
          <BottomTab
            name={`${lineCount} line${(lineCount || 0) > 1 ? "s" : ""}`}
          />
        )}
        {editorStats.totalWords && (
          <BottomTab
            name={`${wordCount} word${(wordCount || 0) > 1 ? "s" : ""}`}
          />
        )}
        {editorStats.totalCharacters && (
          <BottomTab
            name={`${characterCount} character${
              (characterCount || 0) > 1 ? "s" : ""
            }`}
          />
        )}
        {editorStats.autoSave && (
          <BottomTab
            name={`auto-save: ${autoSaveFile ? "on" : "off"}`}
            onClick={toggleAutoSaveFile}
          />
        )}
        {editorStats.theme && (
          <BottomTab
            name={`theme: ${theme.replace("vs-", "")}`}
            onClick={() => {
              console.debug({ theme });
              updateTheme(theme === "vs-dark" ? "vs-light" : "vs-dark");
            }}
          />
        )}
        {/* <BottomTab
          name={`stats`}
          onClick={() => {
            useEditorStats.getState().open();
          }}
        /> */}
      </div>
    </div>
  );
}
