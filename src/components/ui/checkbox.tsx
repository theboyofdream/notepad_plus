import { Check } from "lucide-react";

type CheckboxProps = {
  checked: boolean;
  onChange?: () => void;
  label: string;
  className?: string;
  warning?: string;
  disabled?: boolean;
  transparent?: boolean;
};
export function Checkbox({
  checked,
  label,
  onChange,
  className,
  warning,
  disabled,
  transparent,
}: CheckboxProps) {
  return (
    <div
      className={`flex w-fit flex-col text-sm ${className} ${disabled ? "opacity-40" : ""}`}
    >
      <div
        className="flex gap-1 items-center cursor-pointer"
        onClick={disabled ? undefined : onChange}
      >
        <div
          className={`border overflow-hidden rounded border-current ${transparent ? "border-none" : ""}`}
        >
          <div
            className={`w-3 h-3 flex justify-center items-center aspect-square  ${
              checked && !transparent ? "bg-current" : "bg-transparent"
            }`}
          >
            {checked && (
              <Check
                className={`w-3 aspect-square ${checked && !transparent ? "text-white dark:text-black" : "text-current"}`}
                // style={{
                //   color: checked && !transparent ? "white" : "transparent",
                // }}
              />
            )}
          </div>
        </div>
        <span className="">{label}</span>
      </div>
      {warning && <span className="text-xs">{warning}</span>}
    </div>
  );
}
