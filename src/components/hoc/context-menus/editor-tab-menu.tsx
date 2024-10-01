import { useContextMenu, useFileSystem } from "@/stores";
import { useState } from "react";

export function EditorTabMenu() {
  // const elem = useRef<HTMLDivElement>(null);
  const { closeFile, saveFile, files } = useFileSystem();
  const { openedMenu, clickPosition, tabIndex, closeMenu } = useContextMenu();
  const isOpen = openedMenu === "editor-tab";

  const [eWidth, setEWdith] = useState(0);

  if (!isOpen) return null;

  const OPTIONS = [
    {
      label: "Close tab",
      onClick: async () => {
        await closeFile(files[tabIndex]);
      },
    },
    {
      label: "Close all tabs",
      onClick: async () => {
        for (const file of files) {
          await closeFile(file);
        }
      },
    },
    {
      label: "Save tab",
      onClick: async () => {
        await saveFile(files[tabIndex]);
      },
    },
    {
      label: "Save all tabs",
      onClick: async () => {
        for (const file of files) {
          await saveFile(file);
        }
      },
    },
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

  style.top = clickPosition.y + 6;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-screen h-screen"
        onClick={closeMenu}
      />

      <div
        ref={(e) => {
          if (e && eWidth == 0) {
            setEWdith(e.clientWidth);
          }
        }}
        className={`fixed select-none mb-6 gap-1 text-xs rounded p-0.5 flex flex-col bg-white dark:bg-neutral-800 shadow border border-neutral-200 dark:border-neutral-700`}
        style={style}
      >
        {OPTIONS.map((stat) => (
          <button
            className="hover p-1 pr-1.5 rounded"
            onClick={async () => {
              await stat.onClick();
              closeMenu();
            }}
          >
            <p className="flex">{stat.label}</p>
            {/* <Checkbox
              transparent
              checked={stat.checked}
              label={stat.label}
              className="text-xs"
              onChange={() => {}}
            /> */}
          </button>
        ))}
      </div>
    </>
  );
}
