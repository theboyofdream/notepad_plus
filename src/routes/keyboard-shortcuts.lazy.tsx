import {
  EDITOR_PRE_BUILT_SHORTCUTS,
  EDITOR_SHORTCUTS,
  GLOBAL_SHORTCUTS,
  NAVIGATION_SHORTCUTS,
} from "@/constants";
import { prettierShortcut } from "@/helpers";
import { useGlobalShortcuts } from "@/hooks";
import { createLazyFileRoute, useRouter } from "@tanstack/react-router";
import { ChevronLeft, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const Route = createLazyFileRoute("/keyboard-shortcuts")({
  component: KeyboardShortcutPage,
});

let SHORTCUTS = [
  ...GLOBAL_SHORTCUTS,
  ...EDITOR_SHORTCUTS,
  ...EDITOR_PRE_BUILT_SHORTCUTS,
  ...NAVIGATION_SHORTCUTS,
];

function KeyboardShortcutPage() {
  useGlobalShortcuts();
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
    <div className="flex flex-col min-w-[400px] overflow-scroll gap-3 p-2 px-3">
      <div className="flex gap-1 items-center">
        <button
          className="hover p-1 rounded-full"
          onClick={() => {
            history.back();
          }}
        >
          <ChevronLeft className="w-4 h-4 aspect-square" />
        </button>
        <h1 className="text-md">Keyboard Shortcuts</h1>
      </div>

      <div className="flex w-full">
        <div className="flex flex-col gap-4 min-w-[400px] w-full max-w-xl">
          <div>
            <div className="flex items-center rounded-md bg-neutral-300/60 dark:bg-neutral-700/60">
              <input
                ref={searchRef}
                type="text"
                placeholder="Press '/' to search"
                className="p-1 pl-1.5 bg-transparent flex-1 border-none outline-none text-sm"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search
                className="w-4 h-4 mr-2 cursor-pointer"
                onClick={() => searchRef.current?.focus()}
              />
            </div>
            <span className="pl-1 text-xs text-zinc-400">
              {SHORTCUTS.length} Shortcuts
            </span>
          </div>
          <div className="overflow-hidden rounded-lg shadow border border-neutral-400/50 dark:border-neutral-700/50">
            <table className="w-full">
              <tbody>
                {filteredShortcuts.map(
                  ({ shortcut, prettyShortcut, description }, index) => (
                    <tr
                      key={shortcut}
                      className={
                        index % 2 === 0
                          ? "bg-neutral-200 dark:bg-neutral-700/50"
                          : ""
                      }
                    >
                      <td className="p-0.5 px-1.5">
                        <kbd className="text-xs font-mono">
                          {prettyShortcut}
                        </kbd>
                      </td>
                      <td className="text-sm first-letter:capitalize">
                        {description}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
