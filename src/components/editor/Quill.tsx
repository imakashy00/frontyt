"use client";
import dynamic from "next/dynamic";

const QuillEditor = dynamic(() => import("./QuillEditor"), {
  ssr: false,
  loading: () => <p>loading</p>,
});

export default function Home() {
  return (
    <div>
      <QuillEditor />
    </div>
  );
}
