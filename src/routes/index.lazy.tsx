import { Editor } from "@/components";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useNavigationShortcuts } from "../hooks/useNavigationShortcuts";

export const Route = createLazyFileRoute("/")({
  component: EditorPage,
});

function EditorPage() {
  useNavigationShortcuts();

  return <Editor />;
  // const zenMode = useSettingStore((state) => state.zenMode);

  // return (
  //   <>
  //     {!zenMode && <Header />}
  //     <div className="flex-1 h-full w-full">
  //       <IEditor />
  //     </div>
  //     {!zenMode && <Footer />}
  //   </>
  // );
}
