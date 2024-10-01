import { tauriWindow } from "@/services";
import { useDialog } from "@/stores";
import { X } from "lucide-react";
import { useEffect } from "react";

export function Dialog() {
  const { dialog } = useDialog();

  function handleClose() {
    useDialog.getState().setDialog(undefined);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // e.preventDefault();
        handleClose();
      } else {
        dialog?.actions.forEach((action) => {
          if (
            action.keyShortcut &&
            e.key.toLowerCase() === action.keyShortcut.toLowerCase()
          ) {
            e.preventDefault();
            action.onClick();
          }
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dialog]);

  if (!dialog) return null;

  tauriWindow.requestUserAttention(1);

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-neutral-500/10 z-50">
      <div className="bg-white dark:bg-neutral-700 w-fit p-2 px-3 m-4 rounded-xl space-y-1 shadow-lg max-w-sm">
        <div className="flex justify-between">
          <h2 className="capitalize">{dialog.title}</h2>

          <button
            className="flex items-center gap-1 btn ghost !px-2 rounded-lg"
            onClick={handleClose}
          >
            <p className="text-xs opacity-50">Esc</p>
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm">{dialog.content}</p>
        <div className="flex gap-2 pt-2 justify-end">
          {dialog.actions.map(
            ({ label, keyShortcut, onClick, type }, index) => (
              <button
                className={`flex btn ${type}`}
                onClick={onClick}
                key={label}
                autoFocus={index === 0}
                tabIndex={index}
              >
                {label}
                {/* {keyShortcut && (
                  <>
                    &nbsp;(
                    <p className="font-mono">{keyShortcut}</p>)
                  </>
                )} */}
                {keyShortcut ? ` (${keyShortcut})` : ""}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
