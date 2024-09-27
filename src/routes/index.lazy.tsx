import { createLazyFileRoute } from "@tanstack/react-router";
import { useNavigationShortcuts } from "../hooks/useNavigationShortcuts";
import { Footer } from "../pages/EditorPage/Footer";
import { Header } from "../pages/EditorPage/Header";
import { IEditor } from "../pages/EditorPage/IEditor";
import { useSettingStore } from "../stores/useSettingStore";

export const Route = createLazyFileRoute("/")({
  component: EditorPage,
});

function EditorPage() {
  useNavigationShortcuts();

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
