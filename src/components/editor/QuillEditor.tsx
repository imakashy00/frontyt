"use client";
import { useContentContext } from "@/app/context/YoutubeContext";
import axios from "axios";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.min.css";
import "katex/dist/katex.min.css";
import Quill from "quill";
import Delta from "quill-delta";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState, useCallback } from "react";

// Register a custom icon for save button
const SaveIcon = Quill.import("ui/icons");
SaveIcon["save"] =
  '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M15.75,2H2.25A0.75,0.75,0,0,0,1.5,2.75v12.5A0.75,0.75,0,0,0,2.25,16h12.5a0.75,0.75,0,0,0,0.75-0.75V4.81L15.75,2ZM5.85,14H3.71V11.89H5.85Zm8.74,0H7.35V11.89h7.24Zm0-4.45H3.71V3.75H14.59Z"></path></svg>';

const QuillEditor = () => {
  const quillRef = useRef<HTMLDivElement>(null);
  const quillInstanceRef = useRef<Quill | null>(null);
  const { content, setContent, fileId } = useContentContext();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [isEditorReady, setIsEditorReady] = useState(false);

  // Define the save handler as a callback that always accesses the current fileId
  const handleSave = useCallback(async () => {
    if (!quillInstanceRef.current) return;

    if (!fileId) {
      console.error("No file ID available in context");
      setSaveMessage("Error: Missing file ID");
      setTimeout(() => setSaveMessage(""), 3000);
      return;
    }

    const content = quillInstanceRef.current.getContents();
    setIsSaving(true);
    setSaveMessage("Saving...");

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/note`,
        { file_id: fileId, note: content },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials:true,
        }
      );
      setSaveMessage("Saved");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.error("Save error:", error);
      setSaveMessage("Failed");
      setTimeout(() => setSaveMessage(""), 3000);
    } finally {
      setIsSaving(false);
    }
  }, [fileId]); // The callback depends on fileId

  // Only initialize Quill once
  useEffect(() => {
    if (quillRef.current && !quillInstanceRef.current) {
      const quill = new Quill(quillRef.current, {
        modules: {
          syntax: {
            highlight: (text: string) => hljs.highlightAuto(text).value,
          },
          toolbar: {
            container: [
              [{ size: [] }],
              ["bold", "italic", "underline"],
              [{ color: [] }, { background: [] }],
              [{ script: "sub" }, { script: "super" }],
              [{ header: 1 }, { header: 2 }, "blockquote", "code-block"],
              ["image", "link"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              [{ align: [] }],
              ["save"],
            ],
            handlers: {
              save: () => handleSave(),
            },
          },
        },
        placeholder: "Compose an epic...",
        theme: "snow",
      });

      quillInstanceRef.current = quill;

      // Only set up the text-change handler once
      quill.on("text-change", () => {
        if (setContent) {
          setContent(JSON.stringify(quill.getContents()));
        }
      });

      setIsEditorReady(true);
    }
  }, [setContent, handleSave]); // Include handleSave in dependencies

  // Update toolbar save handler when fileId changes
  useEffect(() => {
    if (quillInstanceRef.current) {
      const quill = quillInstanceRef.current;
      const toolbar = quill.getModule("toolbar");

      // Update the save handler to use the current closure with the updated fileId
      toolbar.handlers.save = () => handleSave();
    }
  }, [handleSave]);

  // Update editor content only after editor is initialized and when content changes
  useEffect(() => {
    if (quillInstanceRef.current && content && isEditorReady) {
      try {
        let deltaContent: Delta;

        // Handle string content
        if (typeof content === "string") {
          try {
            deltaContent = JSON.parse(content);

            // Check for proper Delta structure
            if (
              deltaContent &&
              !deltaContent.ops &&
              Array.isArray(deltaContent)
            ) {
              deltaContent = new Delta({ ops: deltaContent });
            }
          } catch (parseError) {
            console.error("JSON parse error:", parseError);
            deltaContent = new Delta([{ insert: content }]);
          }
        } else {
          // Handle object content
          deltaContent = new Delta(content);

          if (!deltaContent.ops && Array.isArray(deltaContent)) {
            deltaContent = new Delta({ ops: deltaContent });
          }
        }

        // Prevent unnecessary updates
        const currentContent = quillInstanceRef.current.getContents();
        if (JSON.stringify(deltaContent) !== JSON.stringify(currentContent)) {
          // Use silent: true to avoid triggering the text-change event
          quillInstanceRef.current.setContents(deltaContent, "api");

          // Highlight code blocks after content update
          requestAnimationFrame(() => {
            document
              .querySelectorAll("pre code")
              .forEach((block) => hljs.highlightElement(block as HTMLElement));
          });
        }
      } catch (error) {
        console.error("Failed to set content:", error);

        // Fallback for extreme cases
        if (typeof content === "string") {
          quillInstanceRef.current.setText(content);
        }
      }
    }
  }, [content, isEditorReady]);

  return (
    <div className="flex w-[790px] flex-col h-screen">
      <div id="toolbar-container" className="flex w-full"></div>
      <div className="relative overflow-hidden flex-1">
        <div
          className="flex-1 w-full pl-2  overflow-hidden border border-[#5d3fd3]"
          ref={quillRef}
          id="editor"
        ></div>

        {/* Save status message */}
        {saveMessage && (
          <div
            className={`absolute text-sm top-2 right-2 px-3 py-1 rounded-md transition-opacity ${
              isSaving
                ? "bg-blue-100 text-blue-700"
                : saveMessage === "Saved"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {saveMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuillEditor;
