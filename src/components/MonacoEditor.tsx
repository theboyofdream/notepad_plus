import * as monaco from "monaco-editor";
import { useEffect, useRef } from "react";

const MonacoEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );

  useEffect(() => {
    if (editorRef.current) {
      monacoInstance.current = monaco.editor.create(editorRef.current, {
        value: `function hello() {\n  console.log('Hello, Monaco!');\n}`,
        language: "plaintext",
        lineNumbers: "off",
        minimap: {
          enabled: false,
        },
      });
    }

    return () => {
      monacoInstance.current?.dispose();
    };
  }, []);

  // monacoInstance.current

  return <div ref={editorRef} style={{ height: "600px", width: "800px" }} />;
};

export default MonacoEditor;
