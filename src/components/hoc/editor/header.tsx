import { useContextMenu, useFileSystem } from "@/stores";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

type TabProps = {
  file: IFile;
  // id: string;
  // name: string;
  active: boolean;
  // saved: boolean;
  onClick: () => void;
  onClose: () => void;
};
// function Tab({ id, name, active, saved, onClick, onClose }: TabProps) {
function Tab({ file, active, onClick, onClose }: TabProps) {
  return (
    <span
      // id={id}
      id={file.id}
      className={`relative hover flex gap-1 flex-1 rounded font-medium justify-between items-center px-2 text-current group cursor-pointer transition-all duration-500 select-none min-w-32 ${
        active && "active"
      }`}
      onClick={onClick}
    >
      <span className="overflow-hidden flex flex-1 text-center justify-center text-xs whitespace-nowrap py-1">
        {/* {name}
        {!saved && "*"} */}
        {!file.saved && "*"}
        {file.name}
        {file.extension && "."}
        {file.extension}
      </span>
      <button>
        <X
          // className={`absolute right-0 top-0 text-current bg-neutral-200 dark:bg-neutral-600 justify-center items-center p-1.5 h-full aspect-square ${active ? "flex" : "hidden"} group-hover:flex p-0.5 rounded`}
          className={`p-0.5 w-4 h-4 aspect-square ${active ? "flex" : "hidden"} group-hover:flex rounded`}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        />
      </button>
    </span>
  );
}

export function EditorHeader() {
  const { files, focusedFileId, setFocusedFileId, closeFile } = useFileSystem();

  useEffect(() => {
    if (focusedFileId) {
      document.getElementById(focusedFileId)?.scrollIntoView({
        behavior: "smooth",
        // block: "center",
        // inline: "center",
      });
    }
  }, [focusedFileId]);

  const ref = useRef<HTMLDivElement>(null);
  const tabIndex = useRef<number>(0);
  const { setOpenedMenu } = useContextMenu();

  const handleRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();

    // console.log(
    //   e.target
    // );

    let y = e.clientY;
    // console.log("00", y);
    if (ref.current) {
      const { top, height } = ref.current?.getBoundingClientRect();
      y = top + height;
      // console.log("01", y);
    }
    // console.log("02", y);
    // console.log(e.clientY, ref.current?.getBoundingClientRect());

    // console.log({
    //   menuName: "editor-tab",
    //   clickPosition: { x: e.clientX, y },
    //   tabIndex: tabIndex.current,
    // });

    setOpenedMenu({
      menuName: "editor-tab",
      clickPosition: { x: e.clientX, y },
      tabIndex: tabIndex.current,
    });
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-800">
      <div
        ref={ref}
        onContextMenu={(e) => handleRightClick(e)}
        className={`transition flex flex-1 gap-0.5 px-1 p-0.5 overflow-x-scroll w-full no-scrollbar bg-transparent`}
      >
        {files.map((file, index) => (
          <>
            {/* {index === files.length - 1 && (
              <span className="w-[1px] my-0.5 bg-current opacity-30" />
            )} */}
            {/* <TabDivider index={index} total={files.length} /> */}
            {index !== 0 && files.length > 1 && (
              <span className="min-w-[1px] min-h-full my-1 bg-current opacity-15" />
            )}
            {/* {index !== 0 && files.length > 1 && (
              <span className="w-[10px] my-0.5 bg-current opacity-30" />
            )} */}
            <span
              className="flex flex-1"
              // ref={(elem) => {
              //   tabs.current[index] = elem;
              // }}
              // ref={(r) => {
              //   r?.addEventListener("contextmenu", () => {
              //     // e.preventDefault();
              //     tabIndex.current = index;
              //   });
              //   // return () => {
              //   //   r?.removeEventListener("contextmenu", (e) => {
              //   //     // e.preventDefault();
              //   //     tabIndex.current = index;
              //   //   });
              //   // };
              // }}
              onContextMenu={(_) => {
                tabIndex.current = index;
              }}
              key={file.id}
            >
              <Tab
                // id={file.id}
                // key={file.id}
                file={file}
                // name={file.name}
                // saved={file.saved}
                active={file.id === focusedFileId}
                onClick={() => setFocusedFileId(file.id)}
                // onClose={() => closeFile(file)}
                onClose={async () => {
                  closeFile(file);
                }}
              />
            </span>
            {/* <TabDivider index={index} total={files.length} /> */}
            {/* {index > 0 && index !== files.length - 2 && (
              <span className="w-[1px] my-0.5 bg-current opacity-30" />
            )}
            {index === 0 && files.length > 1 && (
              <span className="w-[1px] my-0.5 bg-current opacity-30" />
            )} */}
          </>
        ))}
      </div>
    </div>
  );
}

// interface TabDividerProps {
//   index: number;
//   total: number;
// }
// function TabDivider({ index, total }: TabDividerProps) {
//   // if (index === total - 1) {
//   //   return <span className="w-[1px] my-0.5 bg-current opacity-30" />;
//   // }

//   // if (index > 0 && index !== total - 2) {
//   //   return <span className="w-[1px] my-0.5 bg-current opacity-30" />;
//   // }
//   // if (index === 0 && total > 1) {
//   //   return <span className="w-[1px] my-0.5 bg-current opacity-30" />;
//   // }

//   // let returnDivider = false;

//   // if(index===0)

//   return (
//     <>
//       {index !== 0 && total > 1 && (
//         <span className="w-[10px] my-0.5 bg-current opacity-30" />
//       )}
//     </>
//   );

//   // return null;

//   //  {index === files.length - 1 && (
//   //             <span className="w-[1px] my-0.5 bg-current opacity-30" />
//   //           )}

//   // // return <span className="w-[1px] my-0.5 bg-current opacity-30" />;
//   //    index > 0 && index !== files.length - 2 && (
//   //      <span className="w-[1px] my-0.5 bg-current opacity-30" />
//   //    );
//   //  }
//   //  {
//   //    index === 0 && files.length > 1 && (
//   //      <span className="w-[1px] my-0.5 bg-current opacity-30" />
//   //    );
//   //  }

//   // return <span className="w-[1px] my-0.5 bg-current opacity-30" />;
// }
