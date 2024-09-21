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
import * as monaco from "monaco-editor";
import { useEffect, useRef } from "react";
import {
  closeActiveTab,
  createNewTab,
  gotoNextTab,
  gotoPreviousTab,
  toggleLineNumber,
  toggleLineWrap,
} from "./keyShortcuts";
import { useNoteStore } from "./store/useNoteStore";
import { useSharedStore } from "./store/useSharedStore";

const debug = console.debug;

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

function App() {
  return (
    <div className="flex flex-col w-screen h-screen bg-zinc-800 transition-all text-slate-200">
      <Header />
      <NotepadEditor />
      <Footer />
    </div>
  );
}

function NotepadEditor() {
  const { activeNoteId, showLineNumber, wordWrap } = useSharedStore();
  const { getNoteById } = useNoteStore();

  const editorRef = useRef<HTMLDivElement>(null);
  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );

  useEffect(() => {
    if (editorRef.current) {
      monacoInstance.current = monaco.editor.create(editorRef.current, {
        value: "",
        language: "plaintext",
        lineNumbers: showLineNumber ? "on" : "off",
        largeFileOptimizations: true,
        glyphMargin: false,
        folding: false,
        lineDecorationsWidth: 0,
        minimap: {
          enabled: false,
        },
        theme: "vs-dark",
        wordWrap,
        wrappingStrategy: "advanced",
        stickyScroll: {
          enabled: false,
        },
        smoothScrolling: true,
      });

      const CTRLCMD = monaco.KeyMod.CtrlCmd;
      const SHIFT = monaco.KeyMod.Shift;
      const ALT = monaco.KeyMod.Alt;
      const TAB = monaco.KeyCode.Tab;
      const t = monaco.KeyCode.KeyT;
      const n = monaco.KeyCode.KeyN;
      const w = monaco.KeyCode.KeyW;
      const s = monaco.KeyCode.KeyS;
      const z = monaco.KeyCode.KeyZ;
      const x = monaco.KeyCode.KeyX;
      const COMMA = monaco.KeyCode.Comma;

      monacoInstance.current.addCommand(CTRLCMD | s, () => debug("save"));
      monacoInstance.current.addCommand(CTRLCMD | SHIFT | s, () =>
        debug("save as")
      );
      monacoInstance.current.addCommand(CTRLCMD | n, () => debug("new window"));
      monacoInstance.current.addCommand(ALT | z, toggleLineWrap);
      monacoInstance.current.addCommand(ALT | x, toggleLineNumber);
      monacoInstance.current.addCommand(CTRLCMD | COMMA, () =>
        debug("open settings")
      );
      monacoInstance.current.addCommand(CTRLCMD | t, createNewTab);
      monacoInstance.current.addCommand(CTRLCMD | w, closeActiveTab);
      monacoInstance.current.addCommand(CTRLCMD | TAB, gotoNextTab);
      monacoInstance.current.addCommand(CTRLCMD | SHIFT | TAB, gotoPreviousTab);
    }

    return () => {
      monacoInstance.current?.dispose();
    };
  }, []);

  // update editor content on tab change
  useEffect(() => {
    if (!monacoInstance.current || !activeNoteId) return;
    // debug(getNoteById(activeNoteId)?.content, activeNoteId);
    const value = getNoteById(activeNoteId)?.content ?? "";
    monacoInstance.current.setValue(value);
  }, [activeNoteId]);

  // toggle line
  useEffect(() => {
    if (!monacoInstance.current) return;

    monacoInstance.current.updateOptions({
      lineNumbers:
        // monacoInstance.current.getOption(monaco.editor.EditorOption.lineNumbers)
        //   .renderType === 0 // 0 means off
        showLineNumber ? "on" : "off",
      lineDecorationsWidth:
        // monacoInstance.current?.getOption(
        //   monaco.editor.EditorOption.lineDecorationsWidth
        // ) == 0
        showLineNumber ? undefined : 0,
    });
  }, [showLineNumber]);

  // toggle line wrap
  useEffect(() => {
    if (!monacoInstance.current) return;
    monacoInstance.current.updateOptions({
      wordWrap,
    });
    // monacoInstance.current.getOption(
    //   monaco.editor.EditorOption.wordWrap
    // ) === "off"
    // ? "on" : "off",
  }, [wordWrap]);

  return <div ref={editorRef} className="w-full h-full" />;
}

function Header() {
  const { activeNoteId, setActiveNoteId } = useSharedStore();
  const { notes, removeNote } = useNoteStore();
  return (
    <div className="flex w-full">
      <div className="aspect-square p-1 opacity-80 hover:opacity-100 hover:bg-black flex justify-center items-center cursor-pointer">
        <Home className="icon" />
      </div>
      <ChevronLeft />
      <div className="flex flex-1 overflow-x-scroll w-full no-scrollbar">
        {notes.map((note) => (
          <Tab
            key={note.id}
            name={note.name}
            active={note.id === activeNoteId}
            onClick={() => setActiveNoteId(note.id)}
            onClose={() => removeNote(note.id)}
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
  );
}

function Footer() {
  return (
    <></>
    // <div className="flex justify-between">
    //   <BottomTab name={`line ${cursorPosition.y} col ${cursorPosition.x}`} />

    //   <div className="flex">
    //     <BottomTab
    //       name={`${lineCount} line${(lineCount || 0) > 1 ? "s" : ""}`}
    //     />
    //     <BottomTab
    //       name={`${wordCount} word${(wordCount || 0) > 1 ? "s" : ""}`}
    //     />
    //     <BottomTab
    //       name={`${characterCount} character${
    //         (characterCount || 0) > 1 ? "s" : ""
    //       }`}
    //     />
    //   </div>
    // </div>
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
      <span className="overflow-hidden text-clip text-xs whitespace-nowrap">
        {name.replace(".txt", "")}
      </span>
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
