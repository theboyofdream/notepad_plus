import { useAlerts } from "@/stores";
import { Bomb, Info, TriangleAlert, X } from "lucide-react";

// const AlertTypes = {
//   info: {
//     icon: Info,
//     color: "text-indigo-400",
//   },
//   warning: {
//     icon: TriangleAlert,
//     color: "text-amber-500",
//   },
//   error: {
//     icon: Bomb,
//     color: "text-red-500",
//   },
// };

export function Alerts() {
  const { alerts, removeAlert } = useAlerts();

  function getAlertIcon(type: string) {
    if (type === "warning") {
      return {
        Icon: () => <TriangleAlert className="w-4 h-4 text-amber-500" />,
        color: "amber-500",
      };
    } else if (type === "error") {
      return {
        Icon: () => <Bomb className="w-4 h-4 text-red-500" />,
        color: "red-500",
      };
    }
    return {
      Icon: () => <Info className="w-4 h-4 text-indigo-400" />,
      color: "indigo-400",
    };
  }

  return (
    <div className="fixed bottom-0 right-0 m-2 w-fit max-w-sm h-fit max-h-60 overflow-hidden overflow-y-auto space-y-1">
      {alerts.map((alert) => {
        const { Icon } = getAlertIcon(alert.type);
        setTimeout(() => {
          removeAlert(alert.id);
        }, alert.durationInSec * 1000);
        return (
          <div
            key={alert.id}
            className="flex flex-col rounded-md hover shadow-md"
          >
            <div className="flex gap-2 items-center p-1">
              <Icon />
              <span className="text-sm flex flex-1 gap-1 items-center">
                <p>{alert.message}</p>
              </span>
              <button className="p-0.5" onClick={() => removeAlert(alert.id)}>
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* <span className="flex min-h-[1px] min-w-full">
              <span
                // className={`min-h-full animate-width`}
                style={{
                  minWidth: 0,
                  minHeight: "100%",
                  backgroundColor: color,
                  animationName: "width-increase",
                  animationTimingFunction: "linear",
                  animationDuration: `${alert.duration * 1000}ms`,
                }}
              />
            </span> */}
          </div>
        );
      })}
    </div>
  );
}
