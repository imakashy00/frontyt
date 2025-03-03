// src/app/context/ContentContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

type ContentContextType = {
  content: string;
  setContent: (content: string) => void;
  videoId: string;
  setVideoId: (id: string) => void;
  
};

const ContentContext = createContext<ContentContextType>({
  content: "",
  setContent: () => {},
  videoId: "",
  setVideoId: () => {}
  
});

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<string>("");
  const [videoId, setVideoId] = useState<string>("");

  return (
    <ContentContext.Provider
      value={{ content, setContent, videoId, setVideoId}}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContentContext() {
  return useContext(ContentContext);
}
