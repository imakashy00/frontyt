"use client";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const QuillEditor = dynamic(() => import("./QuillEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
});

export default function Home() {
  return (
    <div>
      <QuillEditor />
    </div>
  );
}
