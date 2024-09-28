import { prettierShortcut } from "@/helpers";
import { createLazyFileRoute, useRouter } from "@tanstack/react-router";
import { ChevronLeft, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  EDITOR_PRE_BUILT_SHORTCUTS,
  GLOBAL_SHORTCUTS,
} from "../constants/keyboard-shortcuts";

export const Route = createLazyFileRoute("/keyboard-shortcuts")({
  component: KeyboardShortcutPage,
});

let SHORTCUTS = [...GLOBAL_SHORTCUTS, ...EDITOR_PRE_BUILT_SHORTCUTS];

function KeyboardShortcutPage() {
  const { history } = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const filteredShortcuts = useMemo(() => {
    const shortcuts = SHORTCUTS.map((shortcut) => {
      return {
        ...shortcut,
        prettyShortcut: prettierShortcut(shortcut.shortcut),
        description: shortcut.description.toLowerCase(),
      };
    });
    return shortcuts.filter(
      ({ shortcut, description, prettyShortcut }) =>
        shortcut.toLowerCase().includes(search.toLowerCase()) ||
        description.toLowerCase().includes(search.toLowerCase()) ||
        prettyShortcut.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "/") {
      event.preventDefault(); // Prevent the "/" character from being typed
      searchRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-2 px-3">
      <div className="flex gap-1 items-center">
        <button
          className="hover p-1 rounded-full"
          onClick={() => {
            history.back();
          }}
        >
          <ChevronLeft className="w-5 h-5 aspect-square" />
        </button>
        <span className="flex gap-2 items-baseline">
          <h1 className="text-2xl">Keyboard Shortcuts</h1>
          <span className="text-sm text-zinc-400">
            {SHORTCUTS.length} shortcuts
          </span>
        </span>
      </div>

      <div className="flex items-center rounded-md bg-neutral-200 dark:bg-neutral-700">
        <input
          ref={searchRef}
          type="text"
          placeholder="Press '/' to search"
          className="p-1 pl-2 bg-transparent flex-1 border-none outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          className="w-4 h-4 mr-2 cursor-pointer"
          onClick={() => searchRef.current?.focus()}
        />
      </div>

      <table className="overflow-hidden rounded-md">
        <tbody>
          {filteredShortcuts.map(
            ({ shortcut, prettyShortcut, description }, index) => (
              <tr
                key={shortcut}
                className={
                  index % 2 === 0 ? "bg-neutral-200 dark:bg-neutral-700" : ""
                }
              >
                <td className="p-1">
                  <kbd className="text-xs font-mono">{prettyShortcut}</kbd>
                </td>
                <td>{description}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
