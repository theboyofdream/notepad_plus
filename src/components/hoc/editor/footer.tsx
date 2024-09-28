import { useNoteStore, useSettingStore, useSharedStore } from "@/stores";
import { useMemo } from "react";

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

export function Footer() {
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

    return {
      characterCount,
      wordCount,
      lineCount,
    };
  }, [activeNoteId]);

  return (
    <div className="flex justify-between overflow-hidden overflow-x-scroll no-scrollbar w-full h-5">
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
            console.debug({ theme });
            updateTheme(theme === "vs-dark" ? "vs-light" : "vs-dark");
          }}
        />
      </div>
    </div>
  );
}
