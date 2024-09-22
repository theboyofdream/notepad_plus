import {
  EDITOR_PRE_BUILT_SHORTCUTS,
  GLOBAL_KEYBOARD_SHORTCUTS,
} from "../constants/keyboard-shortcuts";

export function KeyboardShortcutPage() {
  return (
    <div className="flex flex-col gap-4 p-2 px-3">
      <h1 className="text-2xl"> Keyboard Shortcuts </h1>

      {[...GLOBAL_KEYBOARD_SHORTCUTS, ...EDITOR_PRE_BUILT_SHORTCUTS].map(
        ({ shortcut, description }) => (
          <div className="flex gap-3" key={shortcut}>
            <kbd className="text-sm font-mono">{shortcut}</kbd>
            <span className="text-sm">{description}</span>
          </div>
        )
      )}

      <div>
        <p>title </p>
        <p> message </p>
        <div> </div>
      </div>
    </div>
  );
}
