import { useSettingStore } from "../../stores/useSettingStore";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { IEditor } from "./IEditor";

export default function EditorPage() {
  const zenMode = useSettingStore((state) => state.zenMode);

  return (
    <>
      {!zenMode && <Header />}
      <div className="flex-1 h-full w-full">
        <IEditor />
      </div>
      {!zenMode && <Footer />}
    </>
  );
}
