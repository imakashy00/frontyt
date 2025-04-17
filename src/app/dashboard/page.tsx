"use client";
import ArticleNote from "@/components/notes/ArticleNote";
import ManualNote from "@/components/notes/ManualNote";
import PdfNote from "@/components/notes/PdfNote";
import YoutubeNote from "@/components/notes/YoutubeNote";
// import { Metadata } from "next";
import EmptyNote from "@/components/notes/EmptyNote";
import { useState } from "react";
import { useContentContext } from "../context/YoutubeContext";

// export const metadata: Metadata = {
//   title: "Dashboard",
//   description: "Manage your YouTube video notes and organize content",
// };
const Page = () => {
  const noteId = useState<string>("null");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState(null);

  const { fileId, noteType, content, videoId } = useContentContext();

  // useEffect(()=>{
  //   const loadNote = () =>{
  // if (!noteId){
  // setCurrentNote(null)
  // return
  // }
  //   }
  // note = axios.get()
  //   loadNote()
  // })
  // return <Main />;
  if (!fileId) {
    return <EmptyNote />;
  }

  const renderNote = () => {
    switch (noteId.type) {
      case "youtube":
        <YoutubeNote note={note} />;

        break;

      default:
        break;
    }
  };
  return (
    <div>
      <YoutubeNote videoId={videoId} />
      <ArticleNote />
      <ManualNote />
      <PdfNote />
    </div>
  );
};

export default Page;
