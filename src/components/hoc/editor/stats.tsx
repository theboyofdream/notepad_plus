import { Checkbox } from "@/components/ui/checkbox";
import { useEditorStats, useSettingStore } from "@/stores";
import { useState } from "react";

export function EditorStats() {
  // const elem = useRef<HTMLDivElement>(null);
  const { isOpen, close, clickPosition } = useEditorStats();
  const {
    editorStats,
    updateEditorStats,
    // hideEditorStats,
    // toggleHideEditorStats,
  } = useSettingStore();
  const [eWidth, setEWdith] = useState(0);

  if (!isOpen) return null;

  const STATS = [
    {
      label: "Cursor position",
      checked: editorStats.cursorPosition,
      onChange: () => {
        updateEditorStats({
          cursorPosition: !editorStats.cursorPosition,
        });
      },
    },
    {
      label: "Line count",
      checked: editorStats.totalLines,
      onChange: () => {
        updateEditorStats({
          totalLines: !editorStats.totalLines,
        });
      },
    },
    {
      label: "Word count",
      checked: editorStats.totalWords,
      onChange: () => {
        updateEditorStats({
          totalWords: !editorStats.totalWords,
        });
      },
    },
    {
      label: "Character count",
      checked: editorStats.totalCharacters,
      onChange: () => {
        updateEditorStats({
          totalCharacters: !editorStats.totalCharacters,
        });
      },
    },

    {
      label: "Auto save",
      checked: editorStats.autoSave,
      onChange: () => {
        updateEditorStats({
          autoSave: !editorStats.autoSave,
        });
      },
    },
    {
      label: "Theme",
      checked: editorStats.theme,
      onChange: () => {
        updateEditorStats({
          theme: !editorStats.theme,
        });
      },
    },
    {
      label: "Show/Hide All",
      checked:
        editorStats.autoSave &&
        editorStats.theme &&
        editorStats.cursorPosition &&
        editorStats.totalLines &&
        editorStats.totalWords &&
        editorStats.totalCharacters,
      onChange: () => {
        updateEditorStats({
          autoSave: !editorStats.autoSave,
          theme: !editorStats.theme,
          cursorPosition: !editorStats.cursorPosition,
          totalLines: !editorStats.totalLines,
          totalWords: !editorStats.totalWords,
          totalCharacters: !editorStats.totalCharacters,
        });
      },
    },
    // {
    //   label: "Hide Footer",
    //   checked: hideEditorStats,
    //   onChange: () => {
    //     toggleHideEditorStats();
    //   },
    // },
  ];

  console.log(
    clickPosition.x,
    window.innerWidth,
    eWidth,
    window.innerWidth - eWidth
  );

  let style: Record<string, any> = {};
  const halfWidth = eWidth / 2;
  if (clickPosition.x - halfWidth < 0) {
    console.log("01");
    style.left = halfWidth + 5;
    style.transform = "translateX(-50%)";
  } else if (clickPosition.x + halfWidth > window.innerWidth) {
    console.log("02");
    style.right = 5;
    style.transform = "translateX(0%)";
  } else if (clickPosition.x + eWidth > window.innerWidth) {
    console.log("03");
    style.left = clickPosition.x - halfWidth;
    style.transform = "translateX(0%)";
  } else {
    console.log("04");
    style.left = clickPosition.x;
    style.transform = "translateX(-50%)";
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen" onClick={close} />

      <div
        ref={(e) => {
          if (e && eWidth == 0) {
            setEWdith(e.clientWidth);
          }
        }}
        className={`fixed select-none mb-6 bottom-0 gap-1 text-xs rounded p-0.5 flex flex-col bg-white dark:bg-neutral-800 shadow border border-neutral-200 dark:border-neutral-700`}
        style={style}
      >
        {STATS.map((stat) => (
          <button className="hover p-1 pr-1.5 rounded" onClick={stat.onChange}>
            <Checkbox
              transparent
              checked={stat.checked}
              label={stat.label}
              className="text-xs"
              onChange={() => {}}
            />
          </button>
        ))}
      </div>
    </>
  );
}
