"use client"
import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Button } from "@/components/ui/button";
import { CopyX } from "lucide-react";

interface PROPS{
  aiOutput: string;
}

export default function OutputSection({aiOutput}: PROPS) {
  const editorRef: any = useRef();

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput)
  }, [aiOutput])

  return (
    <div className="bg-white shadow-lg border rounded-lg">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>
        <Button className="flex gap-2" onClick={() => (navigator.clipboard.writeText(aiOutput) , alert("Response copied to Clipboard"))}><CopyX className="h-4 w-4"/>Copy</Button>
      </div>
      <Editor
      ref={editorRef}
        initialValue="Your result is generated here!!!"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onChange={()=>console.log(editorRef.current.getInstance().getMarkdown())}
      />
    </div>
  );
}
