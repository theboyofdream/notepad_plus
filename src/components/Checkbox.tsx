import { Check } from "lucide-react";

type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
  label: string;
};
export function Checkbox({ checked, label, onChange }: CheckboxProps) {
  return (
    <div className="flex">
      <div
        className="flex gap-1 items-center cursor-pointer"
        onClick={onChange}
      >
        {checked ? (
          <div className="border w-4 h-4 rounded bg-blue-500 border-blue-500 justify-center items-center aspect-square">
            <Check className="w-3.5 -translate-y-1" />
          </div>
        ) : (
          <div className="border w-4 h-4 rounded bg-transparent justify-center items-center aspect-square"></div>
        )}
        <span>{label}</span>
      </div>
    </div>
  );
}
