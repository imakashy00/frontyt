"use client";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.min.css"; 
import Quill from "quill";
import Delta from "quill-delta";
import "quill/dist/quill.snow.css"; 
import { useEffect, useRef } from "react";
import { useContentContext } from "@/app/context/YoutubeContext";
import "katex/dist/katex.min.css"; 

// Change the component declaration to use const
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
            highlight: (text: string) => hljs.highlightAuto(text).value,
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
    }
  }, [setContent]);
  // Update editor when content changes in context
  useEffect(() => {
    if (quillInstanceRef.current && content) {
      try {
        let deltaContent: Delta;

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
              deltaContent = new Delta({ ops: deltaContent });
            }
          } catch (parseError) {
            console.error("JSON parse error:", parseError);
            deltaContent = new Delta([{ insert: content }]);
          }
          if (quillInstanceRef.current) {
            requestAnimationFrame(() => {
              document
                .querySelectorAll("pre code")
                .forEach((block) =>
                  hljs.highlightElement(block as HTMLElement)
                );
            });
          }
        } else {
          // Content is already an object
          deltaContent = new Delta(content);

          if (!deltaContent.ops && Array.isArray(deltaContent)) {
            deltaContent = new Delta({ ops: deltaContent });
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
