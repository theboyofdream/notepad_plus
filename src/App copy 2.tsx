import {
  ChevronLeft,
  ChevronRight,
  Home,
  Maximize,
  Minimize,
  Minus,
  Square,
  X,
} from "lucide-react";
import {
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

const defaultText = `Ut porttitor porttitor odio, eget facilisis sem egestas quis. Morbi accumsan cursus arcu, quis vulputate mauris pharetra eu. Donec ut ligula nisi. Sed lobortis tellus ultrices lorem aliquam tristique. Donec accumsan est in malesuada convallis. Curabitur sem risus, feugiat non lectus id, lobortis blandit dui. Sed ac magna at urna accumsan faucibus quis porta ligula. Vivamus sagittis metus sit amet lacinia dictum. Nulla felis nibh, vestibulum nec dapibus a, semper in justo.

Praesent posuere tristique metus, ac maximus quam dapibus sit amet. Curabitur molestie velit orci, ut tristique justo faucibus ac. Sed fermentum ipsum id semper condimentum. In vulputate felis sit amet orci pretium, facilisis porttitor ligula interdum. Vivamus sollicitudin vehicula nisl, pretium porta justo eleifend sit amet. Vestibulum a aliquam enim. Praesent fermentum turpis ex, at lobortis quam mattis non. Ut condimentum diam id mauris maximus pretium. Sed ultrices dolor diam, non placerat felis ultricies ut. Integer id commodo lectus, nec molestie diam. Quisque convallis, elit iaculis rhoncus lacinia, sapien erat venenatis ante, nec commodo ante odio id massa. Mauris ultricies ligula et turpis ultricies, at tincidunt neque ullamcorper. In hac habitasse platea dictumst. Integer ullamcorper gravida turpis ut condimentum. Cras malesuada congue justo quis porta. Nam consequat mi et leo luctus suscipit.

Aliquam ut quam vulputate, accumsan mi nec, consectetur mi. Nunc vel lobortis mauris. Sed leo mauris, gravida non felis nec, mollis bibendum urna. Cras ut nibh nunc. Sed vulputate sapien nec augue sagittis interdum. Curabitur at sem eget diam congue ultrices. Fusce vel lectus vitae tortor sagittis varius vel a augue.

Sed mauris odio, consequat nec faucibus sed, sagittis a ipsum. In at augue eros. Vestibulum eu augue quis sem commodo luctus. Etiam luctus consequat mauris vitae faucibus. Quisque at orci urna. Donec pretium lacus vel tortor malesuada pulvinar. Aenean euismod augue ac ante dictum cursus. Ut in lobortis sapien, id faucibus felis. Pellentesque elementum a tortor ut consequat. Sed erat eros, viverra id dignissim vel, consequat sit amet justo. Vestibulum sit amet nunc vitae dui bibendum convallis. Curabitur ut pulvinar massa, eget fermentum odio. Quisque tempor est eu est pharetra, quis volutpat purus gravida.

Pellentesque varius arcu eu lectus placerat, non maximus urna interdum. Etiam varius diam ac quam fringilla, sit amet luctus dui laoreet. Maecenas congue eros ut vulputate eleifend. Vivamus vitae rhoncus diam, id volutpat leo. Vestibulum ipsum dui, vestibulum non aliquet nec, dapibus in ipsum. Aliquam pellentesque, urna quis placerat facilisis, augue arcu accumsan ante, in tincidunt justo sapien id sapien. Praesent imperdiet sit amet neque lacinia varius. In est ligula, vestibulum a sem a, fringilla consectetur velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Aenean enim sem, feugiat et purus vitae, pellentesque facilisis nisl. Aliquam dolor ante, suscipit quis ligula et, semper lacinia risus. Praesent nec elit non purus euismod fringilla. Integer nec purus dignissim, congue sem eget, pharetra sem. Donec viverra, risus vel bibendum vehicula, nisi tortor tincidunt purus, sed viverra dui felis in nisi. Mauris quis pellentesque magna, at auctor quam. Duis pulvinar, justo vel semper dignissim, diam turpis gravida dolor, eget vehicula est urna ac velit. Vivamus efficitur dui non egestas accumsan.

Aliquam vitae viverra diam, quis semper elit. Ut ut laoreet metus. Pellentesque nec sem sapien. Integer nec diam pharetra, pellentesque metus a, pellentesque diam. Phasellus ornare lorem ac ex maximus malesuada. Vestibulum id metus fermentum, vulputate nisl nec, lobortis nisi. Fusce quis magna augue.

Nunc maximus, lectus nec ullamcorper egestas, dui velit euismod tortor, id imperdiet tortor purus in sapien. Pellentesque malesuada ante mi, eget bibendum diam iaculis in. Mauris mattis tincidunt nisl eu faucibus. Duis placerat metus mauris, id tempus metus mattis eu. Proin sagittis, turpis ac suscipit rutrum, eros ligula ullamcorper sem, sed malesuada justo mi sit amet quam. Aenean eget nisl leo. Praesent egestas ipsum lacus, ut egestas mauris facilisis quis. Vestibulum ut nisi ultricies, mollis nisl a, viverra massa.

Maecenas nibh massa, finibus vel arcu a, auctor volutpat sem. Proin id libero tellus. Quisque sed cursus odio. Suspendisse hendrerit, erat non tempus tristique, urna ligula cursus nibh, vitae viverra nisi elit ut turpis. Aliquam auctor elit eget finibus fermentum. Morbi condimentum nulla eget rhoncus pulvinar. Quisque imperdiet sem eget tincidunt porta. Nam lacinia libero ac ultrices efficitur. Aliquam commodo, sapien in imperdiet aliquet, sem odio mollis augue, eu ullamcorper metus orci eget metus. Maecenas at congue lorem. Vestibulum at mauris ut purus sodales convallis.

Quisque iaculis erat non ligula fringilla, ac sodales est rutrum. Aenean sollicitudin id arcu a tempor. Proin blandit nisi et erat fringilla malesuada. Suspendisse et velit ut tortor porta posuere. Nulla metus ante, sodales commodo nisi sit amet, convallis egestas augue. Donec auctor urna at quam tempor, nec malesuada libero sollicitudin. Curabitur ac porttitor augue, id consequat dui. Sed a eros quis magna pretium interdum eu et tortor. Morbi fringilla metus eget tempor ornare.`;

type Note = {
  id: string;
  name: string;
  content: string;
};

function useNotePad() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: `${new Date().getTime()}`,
      name: "Untitled",
      content: defaultText,
    },
  ]);

  function addNote() {
    const id = new Date().getTime().toString();
    setNotes((oldNotes) => [
      ...oldNotes,
      {
        id: id,
        name: "Untitled",
        content: "",
      },
    ]);
    return id;
  }

  function delNote(id: string) {
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== id));
  }

  function updateNoteContent(id: string, newContent: string) {
    const lines = newContent.split("\n");
    let name = "Untitled";
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.length > 0) {
        name = line.slice(0, 10);
        break;
      }
    }
    setNotes((oldNotes) =>
      oldNotes.map((note) =>
        note.id === id ? { ...note, name, content: newContent } : note
      )
    );
  }

  function getNoteById(id: string): Note | undefined {
    return notes.find((note) => note.id === id);
  }

  return {
    notes,
    addNote,
    delNote,
    updateNoteContent,
    getNoteById,
  };
}

type IconButtonProps = PropsWithChildren & {};
function IconButton({ children }: IconButtonProps) {
  return (
    <div className="min-w- aspect-square p-1 opacity-80 hover:opacity-100 hover:bg-black flex justify-center items-center">
      {children}
    </div>
  );
}

function App() {
  const { notes, addNote, delNote, updateNoteContent, getNoteById } =
    useNotePad();

  const noteInputRef = useRef<HTMLTextAreaElement>(null);
  // const lineNumberRef = useRef<HTMLDivElement>(null);

  const [activeNoteId, setActiveNoteId] = useState<string>(notes[0].id);
  const activeNote = getNoteById(activeNoteId);

  // function handleKeyDown(e) {}
  const handleKeyDown = useCallback(
    (event: any) => {
      const CTRL = event.ctrlKey;
      const SHIFT = event.shiftKey;
      const ALT = event.altKey;
      const KEY = event.key;
      // console.log({
      //   CTRL,
      //   KEY,
      // });
      if (CTRL && KEY === "t") {
        event.preventDefault();
        setActiveNoteId(addNote());
      } else if (CTRL && KEY === "w") {
        event.preventDefault();
        for (let i = 0; i <= notes.length; i++) {
          if (notes[i].id === activeNoteId) {
            // console.log(i, notes.length, i + 1);
            if (i === 0 && notes.length === 1) {
              addNote();
            } else if (i === 0 && notes.length > 1) {
              setActiveNoteId(notes[i + 1].id);
            } else if (notes.length === i + 1) {
              setActiveNoteId(notes[i - 1].id);
            }
            break;
          }
        }
        delNote(activeNoteId);
      } else if (CTRL && SHIFT && KEY === "Tab") {
        event.preventDefault();
        for (let i = 0; i <= notes.length; i++) {
          if (notes[i].id === activeNoteId) {
            if (notes.length === i + 1) {
              setActiveNoteId(notes[0].id);
            } else {
              setActiveNoteId(notes[i - 1].id);
            }
            break;
          }
        }
      } else if (CTRL && KEY === "d") {
        event.preventDefault();
        if (!noteInputRef.current) return;
        const cursorPosition = noteInputRef.current.selectionStart;
        const text = noteInputRef.current.value;

        // Find the start and end of the current word
        const start =
          noteInputRef.current.value.lastIndexOf(" ", cursorPosition - 1) + 1;
        const end = text.indexOf(" ", cursorPosition);

        // If no space is found, adjust the end to the length of the text
        const wordEnd = end === -1 ? text.length : end;

        // Select the current word
        noteInputRef.current.setSelectionRange(start, wordEnd);
      } else if (CTRL && KEY === "x") {
        event.preventDefault();
        const textarea = noteInputRef.current;
        if (textarea) {
          const cursorPosition = textarea.selectionStart;
          const textValue = textarea.value;

          // Check if there is no text selected
          if (textarea.selectionStart === textarea.selectionEnd) {
            // Find the start and end of the current line
            const startOfLine =
              textValue.lastIndexOf("\n", cursorPosition - 1) + 1;
            const endOfLine = textValue.indexOf("\n", cursorPosition);

            // If no newline is found, set endOfLine to the length of the text
            const lineText = textValue.substring(
              startOfLine,
              endOfLine === -1 ? textValue.length : endOfLine
            );

            // Cut the line and copy it to the clipboard
            navigator.clipboard.writeText(lineText).then(() => {
              // Remove the line from the textarea
              const newText =
                textValue.slice(0, startOfLine) +
                textValue.slice(
                  endOfLine === -1 ? textValue.length : endOfLine
                );

              noteInputRef.current?.setSelectionRange(
                startOfLine,
                endOfLine === -1 ? textValue.length : endOfLine
              );

              // document.querySelector("textarea").dispatchEvent(
              //   new KeyboardEvent("keyDown", {
              //     key: "Backspace",
              //     code: "Backspace",
              //     // keyCode: 8, // Deprecated, but included for reference
              //     // which: 8, // Deprecated, but included for reference
              //     bubbles: true,
              //   })
              // );
              // noteInputRef.current
              // setSelectionRange;
              if (activeNote) {
                updateNoteContent(activeNote.id, newText);
              }
              // setCutLine(lineText);
            });
          } // Check if there is text selected
          else if (textarea.selectionStart !== textarea.selectionEnd) {
            // Get the selected text
            const selectedText = textValue.substring(
              textarea.selectionStart,
              textarea.selectionEnd
            );

            // Cut the selected text and copy it to the clipboard
            navigator.clipboard.writeText(selectedText).then(() => {
              // Remove the selected text from the textarea
              const newText =
                textValue.slice(0, textarea.selectionStart) +
                textValue.slice(textarea.selectionEnd);
              // setText(newText);
              if (activeNote) {
                updateNoteContent(activeNote.id, newText);
              }
              // setCutLine(selectedText); // Optionally store the cut text
            });
          }
        }
      } else if (CTRL && KEY === "Tab") {
        event.preventDefault();
        for (let i = 0; i <= notes.length; i++) {
          if (notes[i].id === activeNoteId) {
            if (notes.length === i + 1) {
              setActiveNoteId(notes[0].id);
            } else {
              setActiveNoteId(notes[i + 1].id);
            }
            break;
          }
        }
      } else if (ALT && KEY === "z") {
        event.preventDefault();
        noteInputRef.current?.classList.toggle("text-nowrap");
        noteInputRef.current?.classList.toggle("text-wrap");
      }
      detectCursorPosition();
    },
    [activeNoteId, notes]
  );

  const [cursorPosition, setCursorPosition] = useState({
    x: 0,
    y: 0,
  });
  function detectCursorPosition() {
    const cursorPosition = noteInputRef.current?.selectionStart;
    const text = noteInputRef.current?.value;
    const lines = text?.substr(0, cursorPosition).split("\n") || [];
    const cursorAtLine = lines.length;
    // Get the current line text
    const currentLineText = lines[cursorAtLine - 1];
    // The column number is the length of the current line text
    const cursorAtCol = currentLineText.length + 1; // +1 for 1-based index
    setCursorPosition(() => ({ x: cursorAtCol, y: cursorAtLine }));
    // setCursorAtLine(() => cursorAtLine);
  }

  // const [lineNumberHTML, setLineNumberHTML] = useState(``);
  // function updateLineNumbers() {
  //   const lines = activeNote?.content.split("\n");
  //   // document.getElementById("lineNumbers").innerHTML = lines
  //   //   ?.map((_, index) => index + 1)
  //   //   .join("<br>");
  //   setLineNumberHTML(
  //     () => `${lines?.map((_, index) => index + 1).join("<br>")}`
  //   );
  // }

  const { wordCount, characterCount, lineCount } = useMemo(() => {
    const characterCount = activeNote?.content.length;
    const wordCount = activeNote?.content.trim().split(/\s+/).length;
    const lineCount = activeNote?.content.split("\n").length;

    return {
      wordCount,
      characterCount,
      lineCount,
    };
  }, [activeNote?.content]);

  return (
    <div
      className="flex flex-col w-screen h-screen bg-zinc-800 transition-all text-slate-200"
      onKeyDown={handleKeyDown}
    >
      <div className="flex w-full">
        <IconButton>
          <Home className="icon" />
        </IconButton>
        <ChevronLeft />
        <div className="flex flex-1 overflow-x-scroll w-full no-scrollbar">
          {notes.map((note) => (
            <Tab
              key={note.id}
              name={note.name}
              active={note.id === activeNoteId}
              onClick={() => setActiveNoteId(note.id)}
              onClose={() => delNote(note.id)}
            />
          ))}
        </div>
        <ChevronRight />
        <Minus />
        <Square />
        <Minimize />
        <Maximize />
        <X />
      </div>

      <div className="flex h-full">
        {/* <div
          ref={lineNumberRef}
          dangerouslySetInnerHTML={{ __html: lineNumberHTML }}
          id="lineNumbers"
          className="pr-4 text-right select-none"
        ></div> */}
        <textarea
          ref={noteInputRef}
          name="editor"
          id="editor"
          autoFocus
          // defaultValue={activeNote?.content}
          value={activeNote?.content}
          onMouseDown={detectCursorPosition}
          // onInput={updateLineNumbers}
          onChange={(e) => {
            if (activeNote) {
              updateNoteContent(activeNote.id, e.target.value);
            }
          }}
          className="flex-1 resize-none scrollbar text-wrap bg-transparent text-slate-200 ml-1 mr-3 mb-1 border-none outline-none text-sm"
        />
      </div>
      <div className="flex justify-between">
        <BottomTab name={`line ${cursorPosition.y} col ${cursorPosition.x}`} />

        <div className="flex">
          <BottomTab
            name={`${lineCount} line${(lineCount || 0) > 1 ? "s" : ""}`}
          />
          <BottomTab
            name={`${wordCount} word${(wordCount || 0) > 1 ? "s" : ""}`}
          />
          <BottomTab
            name={`${characterCount} character${
              (characterCount || 0) > 1 ? "s" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

type TabProps = {
  name: string;
  active: boolean;
  onClick: () => void;
  onClose: () => void;
};
function Tab({ name, active, onClick, onClose }: TabProps) {
  return (
    <span
      className={`flex font-medium hover:bg-zinc-700 justify-between items-center px-1 text-slate-200 text-sm group cursor-pointer transition-all select-none min-w-20 ${
        active && "bg-zinc-700"
      }`}
      onClick={onClick}
    >
      <span className="">{name}</span>
      <X
        className="text-slate-300 icon hidden group-hover:flex"
        onClick={onClose}
      />
    </span>
  );
}

type BottomTabProps = {
  name: string;
  onClick?: () => void;
};
function BottomTab({ name, onClick }: BottomTabProps) {
  return (
    <span
      className={`flex items-end hover:bg-zinc-700 justify-between px-2 p-1 gap-1 text-slate-200 text-xs group cursor-pointer transition-all select-none`}
      onClick={onClick}
    >
      <span>{name}</span>
    </span>
  );
}
