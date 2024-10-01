import { Editor, Error } from "@/components";
import { useGlobalShortcuts } from "@/hooks";
import { createFileRoute } from "@tanstack/react-router";

const EditorPage = () => {
  useGlobalShortcuts();
  return <Editor />;
};

export const Route = createFileRoute("/")({
  component: EditorPage,
  errorComponent: Error,
});
