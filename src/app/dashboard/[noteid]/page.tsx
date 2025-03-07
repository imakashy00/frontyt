import Main from "@/components/Main";
// import { Metadata } from "next";
// export async function generateMetadata({
//   params,
// }: {
//   params: { noteName: string };
// }): Promise<Metadata> {
//   return {
//     title: `${params.noteName} Notes`,
//     description: `Your notes for ${params.noteName} YouTube video`,
//   };
// }
// Server component that receives params as props
export default function Page() {
  return (
    <div className="flex">
      <Main />
    </div>
  );
}
