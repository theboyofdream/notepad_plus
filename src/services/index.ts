import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { getCurrentWindow } from "@tauri-apps/api/window";
export * as dialog from "@tauri-apps/plugin-dialog";
export * as fs from "@tauri-apps/plugin-fs";
export * as monaco from 'monaco-editor';
export * from "./localStorage";

export const tauriWindow = getCurrentWindow();
export const webview = getCurrentWebviewWindow();
