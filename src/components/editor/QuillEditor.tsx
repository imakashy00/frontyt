"use client";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.min.css"; // Import highlight.js styles
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill styles
import { useEffect, useRef } from "react";
// import katex from "katex";
import { useContentContext } from "@/app/context/YoutubeContext";
import "katex/dist/katex.min.css"; // Import KaTeX styles



const QuillEditor = () => {
  const quillRef = useRef<HTMLDivElement>(null);
  const quillInstanceRef = useRef<Quill | null>(null);
  const { content, setContent } = useContentContext();
  // Log before destructuring to see if context exists
  console.log("Context access:", useContentContext());

  // console.log("Editor Content ", content);
  useEffect(() => {
    if (quillRef.current) {
      const quill = new Quill(quillRef.current, {
        modules: {
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
          toolbar: [
            [{ size: [] }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ header: 1 }, { header: 2 }, "blockquote", "code-block"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            [{ align: [] }],
            ["link", "image"],
            // ["clean"],
          ],
        },
        placeholder: "Compose an epic...",
        theme: "snow",
      });
      // Store the instance for later use
      quillInstanceRef.current = quill;
      quill.on("text-change", () => {
        if (setContent) {
          const delta = quill.getContents();
          setContent(JSON.stringify(delta));
        }
      });
      // const Delta = Quill.import("delta");
      // // Set initial content
      // // Define initial content
      // const initialContent = new Delta();

      // quill.setContents(initialContent);
    }
  }, []);
  // Update editor when content changes in context
  // Update editor when content changes in context
  useEffect(() => {
    if (quillInstanceRef.current && content) {
      try {
        let deltaContent;

        // Parse content if it's a string
        if (typeof content === "string") {
          try {
            deltaContent = JSON.parse(content);

            // Make sure it has the proper Quill Delta structure with "ops"
            if (
              deltaContent &&
              !deltaContent.ops &&
              Array.isArray(deltaContent)
            ) {
              deltaContent = { ops: deltaContent };
            }
          } catch (parseError) {
            console.error("JSON parse error:", parseError);
            // If JSON parsing fails but it's a string, treat as plain text
            deltaContent = { ops: [{ insert: content }] };
          }
        } else {
          // Content is already an object
          deltaContent = content;

          // Ensure it has the proper structure
          if (!deltaContent.ops && Array.isArray(deltaContent)) {
            deltaContent = { ops: deltaContent };
          }
        }

        // Only update if different to avoid loops
        const currentContent = quillInstanceRef.current.getContents();
        if (JSON.stringify(deltaContent) !== JSON.stringify(currentContent)) {
          quillInstanceRef.current.setContents(deltaContent);
        }
      } catch (error) {
        console.error("Failed to set content:", error);

        // Fallback for extreme cases - just set as text
        if (typeof content === "string") {
          quillInstanceRef.current.setText(content);
        }
      }
    }
  }, [content]);

  return (
    <div className="flex w-[790px] flex-col h-screen ">
      <div id="toolbar-container" className="flex w-full"></div>
      <div
        className="flex-1 w-full pl-6 overflow-hidden border border-[#5d3fd3]"
        ref={quillRef}
        id="editor"
      ></div>
    </div>
  );
};

export default QuillEditor;
