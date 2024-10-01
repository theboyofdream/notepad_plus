import { Checkbox } from "@/components";
import { useGlobalShortcuts } from "@/hooks";
import { useFileSystem, useSettingStore } from "@/stores";
import { createLazyFileRoute, useRouter } from "@tanstack/react-router";
import { ChevronLeft, LucideFolderPen } from "lucide-react";

export const Route = createLazyFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  useGlobalShortcuts();
  const { history } = useRouter();
  const {
    wordWrap,
    toggleWordWrap,
    theme,
    updateTheme,
    showLineNumber,
    toggleLineNumber,
  } = useSettingStore();
  const {
    autoSaveFile,
    autoSaveFileDir,
    // setAutoSaveFileDir,
    toggleAutoSaveFile,
    setAutoSaveFileDir,
  } = useFileSystem();
  return (
    <div className="flex flex-col min-w-[400px] overflow-scroll gap-3 p-2 px-3">
      <div className="flex gap-1 items-center">
        <button
          className="hover p-1 rounded-full"
          onClick={() => history.back()}
        >
          <ChevronLeft className="w-4 h-4 aspect-square" />
        </button>
        <h1 className="text-md">Settings</h1>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm">Select folder for auto-save</span>
        <button
          className="bg-black text-white dark:bg-white dark:text-black p-1.5 px-2.5 w-fit rounded-md text-center text-xs opacity-90 hover:opacity-100 flex gap-1 items-center"
          onClick={setAutoSaveFileDir}
        >
          <LucideFolderPen className="w-3.5 h-3.5" />
          Select folder
        </button>
        <span className="text-xs opacity-40">
          Folder path: {autoSaveFileDir}
        </span>
        <Checkbox
          // transparent
          checked={autoSaveFile}
          onChange={autoSaveFileDir ? toggleAutoSaveFile : undefined}
          label="Enable auto-save"
          disabled={!autoSaveFileDir}
          warning={
            autoSaveFileDir ? "" : "Select Folder to enable this feature."
          }
        />
        <Checkbox
          checked={showLineNumber}
          onChange={toggleLineNumber}
          label="Show line numbers"
        />
        <Checkbox
          checked={wordWrap}
          onChange={toggleWordWrap}
          label="Wrap lines"
        />
        <Checkbox
          checked={theme === "vs-dark"}
          onChange={() =>
            updateTheme(theme === "vs-dark" ? "vs-light" : "vs-dark")
          }
          label="Enable dark mode"
        />
        <Checkbox
          checked={useSettingStore.getState().alwaysOnTop}
          onChange={useSettingStore.getState().toggleAlwaysOnTop}
          label="Stay on top"
        />
        <Checkbox
          checked={useSettingStore.getState().zenMode}
          onChange={useSettingStore.getState().toggleZenMode}
          label="Zen mode"
        />

        {/* <div>
          <span>Font size</span>
          <input
            type="range"
            min={12}
            max={32}
            // value={fontSize}
            // onChange={handleFontSizeChange}
          />
        </div> */}
      </div>
    </div>
  );
}
