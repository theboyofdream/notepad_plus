import { X } from "lucide-react";
import { useFileSystem } from "../../stores/useFileSystem";

type TabProps = {
  name: string;
  active: boolean;
  saved: boolean;
  onClick: () => void;
  onClose: () => void;
};
function Tab({ name, active, saved, onClick, onClose }: TabProps) {
  return (
    <span
      // className={`flex gap-1 font-medium hover:bg-zinc-700 justify-between items-center px-2 text-current text-sm group cursor-pointer transition-all duration-500 select-none min-w-20 ${
      className={`flex gap-1 font-medium justify-between items-center px-2 text-current text-sm group cursor-pointer transition-all duration-500 select-none min-w-20 ${
        active && "active"
      }`}
      onClick={onClick}
    >
      <span className="overflow-hidden text-clip text-xs whitespace-nowrap py-1.5">
        {name}
        {!saved && "*"}
      </span>
      <X
        // className="text-current w-4 h-4 hidden group-hover:flex hover:bg-zinc-800 rounded-full p-0.5"
        className="text-current w-4 h-4 hidden group-hover:flex rounded-full p-0.5"
        onClick={onClose}
      />
    </span>
  );
}

export function Header() {
  const { files, focusedFile, setFocusedFile, closeFile } = useFileSystem();

  return (
    <div className="w-full bg-white dark:bg-neutral-800">
      <div
        className={`flex flex-1 overflow-x-scroll w-full no-scrollbar bg-transparent`}
      >
        {files.map((file) => (
          <Tab
            key={file.id}
            name={file.name}
            saved={file.saved}
            active={file.id === focusedFile?.id}
            onClick={() => setFocusedFile(file)}
            onClose={() => closeFile(file)}
          />
        ))}
      </div>
    </div>
  );
}
