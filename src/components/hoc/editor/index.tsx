import { useSettingStore } from "@/stores";
import { IEditor } from "./editor";
import { EditorFooter } from "./footer";
import { EditorHeader } from "./header";

export function Editor() {
  const zenMode = useSettingStore((state) => state.zenMode);
  const hideEditorStats = useSettingStore((state) => state.hideEditorStats);

  return (
    <>
      {!zenMode && <EditorHeader />}
      <div className="flex-1 h-full w-full">
        <IEditor />
      </div>
      {!zenMode && !hideEditorStats && <EditorFooter />}
    </>
  );
}
