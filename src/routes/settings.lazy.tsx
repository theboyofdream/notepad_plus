import { createLazyFileRoute, useRouter } from "@tanstack/react-router";

import { ChevronLeft, LucideFolderPen } from "lucide-react";
import { Checkbox } from "../components/Checkbox";
import { useFileSystem } from "../stores/useFileSystem";
import { useSettingStore } from "../stores/useSettingStore";

export const Route = createLazyFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
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
  } = useFileSystem();
  return (
    <div className="flex flex-col gap-4 p-2 px-3">
      <div className="flex gap-1 items-center">
        <button
          className="hover p-1 rounded-full"
          onClick={() => history.back()}
        >
          <ChevronLeft className="w-5 h-5 aspect-square" />
        </button>
        <h1 className="text-2xl">Settings</h1>
      </div>
      <div className="gap-0 flex flex-col">
        <div className="flex gap-2 items-center">
          <span>Select folder for auto-save</span>
          <button
            className="bg-black text-white dark:bg-white dark:text-black px-3 rounded text-center opacity-80 hover:opacity-100 flex gap-1 items-center p-1"
            // onClick={}
          >
            <LucideFolderPen className="w-4 h-4" />
            Select folder
          </button>
        </div>
        <span className="text-xs">Folder path: {autoSaveFileDir}</span>
      </div>
      <div className="flex flex-col gap-2">
        <Checkbox
          checked={autoSaveFile}
          onChange={toggleAutoSaveFile}
          label="Enable auto-save"
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
      </div>
    </div>
  );
}
