// In Main.tsx
"use client";
import { useContentContext } from "@/app/context/YoutubeContext";
import Quill from "./editor/Quill";
import YtAi from "./YtAi";

const Main = () => {
  const { videoId } = useContentContext();

  console.log("Current videoId from context:", videoId);

  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}`
    : "https://www.youtube.com/embed/jNQXAC9IVRw"; // Default fallback

  return (
    <div className="flex h-full">
      <div className="flex flex-col w-[880px] h-screen mx-1">
        <div className="flex h-[495px] mb-1">
          <iframe
            className="rounded-xl"
            title="YouTube video"
            width="880px"
            height="495px"
            src={embedUrl}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex flex-1 overflow-auto">
          <YtAi videoId={videoId} />
        </div>
      </div>
      <div className="flex w-full flex-1 h-screen">
        {/* I need to implement functionality to switch tabs to Quiz, Flash cards and Quill */}
        <Quill/>
      </div>
    </div>
  );
};

export default Main;
