import { create } from "zustand";

interface Alert {
  id: string;
  message: string;
  type: "info" | "warning" | "error";
  durationInSec: number;
}

interface AlertsStore {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, "durationInSec">) => void;
  removeAlert: (id: string) => void;
}

export const useAlerts = create<AlertsStore>((set) => ({
  alerts: [
    // {
    //   id: "1",
    //   message: "Hello, world!",
    //   type: "info",
    //   duration: 1,
    // },
    // {
    //   id: "2",
    //   message: "Hello, world!",
    //   type: "warning",
    //   duration: 3,
    // },
    // {
    //   id: "3",
    //   message: "Hello, world!",
    //   type: "error",
    //   duration: 5,
    // },
  ],
  addAlert: (alert) => set((state) => ({
    alerts: [...state.alerts, {
      ...alert,
      durationInSec: alert.type === "error" ? 5 : 3
    }]
  })),
  removeAlert: (id) => set((state) => ({ alerts: state.alerts.filter((alert) => alert.id !== id) })),
}));
