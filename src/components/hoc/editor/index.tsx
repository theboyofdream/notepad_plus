import { useSettingStore } from "@/stores";
import { IEditor } from "./editor";
import { Footer } from "./footer";
import { Header } from "./header";

export function Editor() {
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
