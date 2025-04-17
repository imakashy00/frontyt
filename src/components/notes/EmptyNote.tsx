import { FileIcon, PlusCircleIcon } from "lucide-react";

const EmptyNote = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <FileIcon size={48} className="text-grey-400 mb-4" />
      <h2 className="text-2xl font-bold mb-2">No note selected</h2>
      <p className="text-gray-500 mb-6 max-w-md">
        Select a note from the sidebar to view its content, or create a new note
        to get started.
      </p>
      <div className="flex gap-4">
        <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <PlusCircleIcon size={18} />
          Create New Note
        </button>
      </div>
    </div>
  );
};

export default EmptyNote;
