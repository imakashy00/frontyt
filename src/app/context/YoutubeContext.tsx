// src/app/context/ContentContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

type ContentContextType = {
  content: string;
  setContent: (content: string) => void;
  videoId: string;
  setVideoId: (id: string) => void;
  fileId:string,
  setFileId:(id:string)=>void;  
};

const ContentContext = createContext<ContentContextType>({
  content: "",
  setContent: () => {},
  videoId: "",
  setVideoId: () => {},
  fileId:"",
  setFileId:()=>{}
  
});

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<string>("");
  const [videoId, setVideoId] = useState<string>("");
  const [fileId,setFileId] = useState<string>("");

  return (
    <ContentContext.Provider
      value={{ content, setContent, videoId, setVideoId,fileId,setFileId}}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContentContext() {
  return useContext(ContentContext);
}
