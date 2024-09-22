import { useState } from "react";
import { Checkbox } from "../components/Checkbox";

export function Settings() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col gap-4 p-2 px-3">
      <h1 className="text-2xl">Settings</h1>
      <div className="gap-0 flex flex-col">
        <div className="flex gap-2">
          <span>Select folder for auto-save</span>
          <button className="bg-white text-black px-3 rounded text-center opacity-80 hover:opacity-100">
            choose
          </button>
        </div>
        <span className="text-xs">Folder path: </span>
      </div>
      <Checkbox
        checked={checked}
        onChange={() => setChecked(!checked)}
        label="Enable auto-save"
      />
      <Checkbox
        checked={checked}
        onChange={() => setChecked(!checked)}
        label="Show line numbers"
      />
      <Checkbox
        checked={checked}
        onChange={() => setChecked(!checked)}
        label="Wrap lines"
      />
    </div>
  );
}
