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
        <div
          className={`border w-4 h-4 rounded-sm ${
            checked ? "bg-current" : "bg-transparent"
          } border-current flex justify-center items-center aspect-square`}
        >
          {checked && (
            <Check className="w-3.5 aspect-square text-white dark:text-black" />
          )}
        </div>
        <span>{label}</span>
      </div>
    </div>
  );
}
