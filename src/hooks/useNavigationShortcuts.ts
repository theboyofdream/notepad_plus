import { useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { NAVIGATION_SHORTCUTS } from "../constants/keyboard-shortcuts";
import { extractKeys, formatShortcut } from "../helpers";

type path = 'settings' | 'keyboard-shortcuts'
let goto = (path: path) => { console.log(path) };

export function useNavigationShortcuts() {
  const navigate = useNavigate();
  const { history } = useRouter()

  function bindNavigationShortcut(e: KeyboardEvent) {

    const { CTRL_KEY, KEY } = extractKeys(e);
    const formattedShortcut = formatShortcut({ CTRL_KEY, KEY });

    for (let { shortcut, to } of NAVIGATION_SHORTCUTS) {
      if (shortcut.toLowerCase() === formattedShortcut) {
        e.preventDefault();

        if (history.location.pathname === to) {
          history.back();
        } else if (history.location.pathname === "/") {
          navigate({ to });
        }

        return;
      }
    }
  }

  goto = (path: path) => {
    navigate({ to: `/${path}` });
  }

  useEffect(() => {
    document.addEventListener("keyup", bindNavigationShortcut);

    return () => {
      document.removeEventListener("keyup", bindNavigationShortcut);
    };
  }, []);
}


export { goto };

