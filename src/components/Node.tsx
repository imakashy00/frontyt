import { useContentContext } from "@/app/context/YoutubeContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import {
  ChevronRight,
  Edit,
  File as FileIcon,
  Folder,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type File = {
  id: string;
  name: string;
  video_id: string;
  content:string
};

type Node = {
  id: string;
  name: string;
  parent_id: string | null;
  subfolders: Node[];
  files: File[];
};

type NodeProps = {
  folder: Node;
  siblings: Node[];
  onCreateFolder: (parentFolderName: string) => void;
  onCreateNote: (folderId: string, newNote: string, youtubeUrl: string) => void;
  onDeleteFolder: (folderId: string) => void;
  onRenameFolder: (folderId: string, newFolderName: string) => void;
  onRenameFile: (fileId: string, newNote: string) => void;
  onDeleteFile: (fileId: string) => void;
};

const Node = ({
  folder,
  siblings,
  onCreateFolder,
  onCreateNote,
  onDeleteFolder,
  onRenameFolder,
  onRenameFile,
  onDeleteFile,
}: NodeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFileInput, setIsOpenFileInput] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isRenamingFolder, setIsRenamingFolder] = useState(false);
  const [isRenamingFile, setIsRenamingFile] = useState<string | null>(null); // Track which file is being renamed
  const [newFolderName, setNewFolderName] = useState(folder.name);
  const [newNote, setNewNote] = useState("");
  const [isDialogOpenFolder, setIsDialogOpenFolder] = useState(false);
  const [isDialogOpenFile, setIsDialogOpenFile] = useState<string | null>(null); // Track which file's dialog is open
  const dialogRef = useRef<HTMLDivElement>(null);
  const { setVideoId, setContent } = useContentContext();
  const handleRenameFolder = () => {
    const trimmedName = newFolderName.trim();

    if (!trimmedName) {
      setNewFolderName(folder.name);
      return;
    }

    // Check for duplicates among siblings
    if (siblings.some((f) => f.name === trimmedName && f.id !== folder.id)) {
      console.log("Duplicate name not allowed");
      setNewFolderName(folder.name);
      return;
    }

    // API call to update backend
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/folder`,
        { new_name: trimmedName, folder_id: folder.id },
        { withCredentials: true }
      )
      .then(() => {
        onRenameFolder(folder.id, trimmedName);
        setIsRenamingFolder(false);
      })
      .catch((error) => {
        console.error("Error renaming folder:", error);
      });
  };

  const handleRenameFile = (file: File) => {
    const trimmedName = newNote.trim();

    // Input validation
    if (!trimmedName) {
      console.error("File name cannot be empty");
      setNewNote(file.name);
      return;
    }

    // Check for special characters
    if (!/^[a-zA-Z0-9-_ ]+$/.test(trimmedName)) {
      console.error(
        "File name can only contain letters, numbers, spaces, hyphens and underscores"
      );
      return;
    }

    // Check for duplicates
    if (folder.files?.some((f) => f.name === trimmedName && f.id !== file.id)) {
      console.error("Duplicate file name not allowed");
      return;
    }

    onRenameFile(file.id, trimmedName);
    setIsRenamingFile(null);
    setNewNote("");
  };

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleDialogBoxFolder = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDialogOpenFolder(!isDialogOpenFolder);
  };

  const handleDialogBoxFile = (fileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDialogOpenFile(isDialogOpenFile === fileName ? null : fileName); // Toggle dialog for the specific file
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as HTMLElement)
      ) {
        setIsDialogOpenFolder(false);
        setIsDialogOpenFile(null); // Close all file dialogs
      }
    };
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDialogOpenFolder(false);
        setIsDialogOpenFile(null); // Close all file dialogs
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  useEffect(() => {
    if (folder.name === "New Folder") {
      setIsRenamingFolder(true);
    }
  }, [folder.name]);

  return (
    <li className="mb-1 group">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex justify-between items-center gap-1 ${
          isHovered ? "bg-gray-100" : ""
        }`}
      >
        <div className="py-1 flex gap-1 w-full">
          <button
            onClick={handleIsOpen}
            className="p-0 shadow-none bg-none"
            title="Toggle folder"
          >
            <ChevronRight
              size={24}
              className={`transition-transform duration-100 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </button>

          {isRenamingFolder ? (
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onBlur={handleRenameFolder}
              onKeyDown={(e) => e.key === "Enter" && handleRenameFolder()}
              autoFocus
              className="rounded py-0 w-[160px] outline-none"
              placeholder="New folder"
              title="Rename folder"
            />
          ) : (
            <div className="flex items-center justify-between w-full">
              <span>{folder.name}</span>
              {!isRenamingFolder && isHovered && (
                <MoreHorizontal
                  onClick={handleDialogBoxFolder}
                  className="size-6 cursor-pointer"
                />
              )}
            </div>
          )}
        </div>
      </div>
      {isDialogOpenFolder && (
        <div
          ref={dialogRef}
          className="absolute left-[200px] -mt-6 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div className="py-1">
            <button
              onClick={() => {
                onCreateFolder(folder.id);
                setIsDialogOpenFolder(false);
                // setIsRenamingFolder(true)
              }}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              <Folder className="mr-2 h-4 w-4" />
              New Folder
            </button>
            <button
              onClick={() => {
                setIsOpenFileInput(true);
                // onCreateNote(folder.name);
                setIsDialogOpenFolder(false);
              }}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              <FileIcon className="mr-2 h-4 w-4" />
              New Note
            </button>
            <button
              onClick={() => {
                setIsRenamingFolder(true);
                setIsDialogOpenFolder(false);
              }}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              <Edit className="mr-2 h-4 w-4" />
              Rename
            </button>
            <button
              onClick={() => {
                onDeleteFolder(folder.id);
                setIsDialogOpenFolder(false);
              }}
              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="border-l">
          <ul className="pl-4" key={`subfolders-${folder.id}`}>
            {folder.subfolders?.map((subfolder) => (
              <Node
                folder={subfolder}
                siblings={folder.subfolders || []}
                key={subfolder.id}
                onCreateFolder={onCreateFolder}
                onCreateNote={onCreateNote}
                onDeleteFolder={onDeleteFolder}
                onRenameFolder={onRenameFolder}
                onDeleteFile={onDeleteFile}
                onRenameFile={onRenameFile}
              />
            ))}
          </ul>
          <ul className="pl-4" key={`files-${folder.id}`}>
            {folder.files?.map((file) => (
              <li
                key={file.id}
                className="mb-1 py-1 group/file " // Add relative positioning
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="flex items-center justify-between w-full">
                  {isRenamingFile === file.id ? (
                    <span className="flex items-center gap-1">
                      <FileIcon size={18} />
                      <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        onBlur={() => handleRenameFile(file)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleRenameFile(file)
                        }
                        autoFocus
                        className="rounded py-0 w-[140px] outline-none"
                        placeholder="New file name"
                        title="Rename file"
                      />
                    </span>
                  ) : (
                    <Link
                      href={`/dashboard/${file.name}`}
                      onClick={() => {
                        console.log("Setting videoId from file", file.video_id);
                        setContent(file.content);
                        setVideoId(file.video_id);
                      }}
                    >
                      <span className="flex items-center gap-1">
                        <FileIcon size={18} />
                        {file.name}
                      </span>
                    </Link>
                  )}
                  <div className="opacity-0 group-hover/file:opacity-100 transition-opacity">
                    {!isRenamingFile && isHovered && (
                      <MoreHorizontal
                        onClick={(e) => handleDialogBoxFile(file.name, e)}
                        className="size-6 cursor-pointer"
                      />
                    )}
                  </div>
                </div>
                {isDialogOpenFile === file.name && (
                  <div
                    ref={dialogRef}
                    className="absolute left-[200px] -mt-6 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setNewNote(file.name);
                          setIsRenamingFile(file.id); // Start renaming
                          setIsDialogOpenFile(null); // Close the dialog
                        }}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Rename
                      </button>
                      <button
                        onClick={() => {
                          onDeleteFile(file.id);
                          setIsDialogOpenFile(null); // Close the dialog
                        }}
                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {isOpenFileInput && (
        <Dialog open={isOpenFileInput} onOpenChange={setIsOpenFileInput}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="newnote">File name</label>
                <input
                  id="newnote"
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="rounded py-2 px-3 border outline-none"
                  placeholder="Enter file name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="url">YouTube URL</label>
                <input
                  id="url"
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="rounded py-2 px-3 border outline-none"
                  placeholder="Enter YouTube URL"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpenFileInput(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newNote && youtubeUrl) {
                    onCreateNote(folder.id, newNote, youtubeUrl);
                    setIsOpenFileInput(false);
                    setNewNote("");
                    setYoutubeUrl(youtubeUrl);
                  }
                }}
                className="px-4 py-2 text-sm text-white bg-[#5d3fd3] hover:bg-[#4f35b3] rounded"
              >
                Create
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </li>
  );
};

export default Node;
