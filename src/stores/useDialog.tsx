import { create } from "zustand";

type DialogAction = {
  label: string;
  type: "primary" | "ghost";
  keyShortcut?: string;
  onClick: () => void;
};

interface DialogStore {
  dialog?: {
    title: string;
    content: string;
    actions: DialogAction[];
  };
  setDialog: (dialog: DialogStore["dialog"]) => void;
}

export const useDialog = create<DialogStore>((set) => ({
  dialog: undefined,
  setDialog: (dialog) => set({ dialog }),
}));
