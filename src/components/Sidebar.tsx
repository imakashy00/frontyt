"use client";
import { useContentContext } from "@/app/context/YoutubeContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { Folder, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Bottom from "./Bottom";
import { default as Node } from "./Node";
import SideHeader from "./SideHeader";
import { Button } from "./ui/button";

const Sidebar = () => {
  const [folders, setFolders] = useState<Node[]>([]);
  // const [isCreatingRootFolder, setIsCreatingRootFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const router = useRouter();
  const { setContent, setVideoId } = useContentContext();
  const [isRootFolderDialogOpen, setIsRootFolderDialogOpen] = useState(false);
  const [folderNameError, setFolderNameError] = useState("");

  useEffect(() => {
    const getFolders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/folder`,
          {
            withCredentials: true, // Ensure cookies are sent
          }
        );
        // handle the response here
        console.log(typeof res.data.folders);
        console.log(res.data);
        setFolders(res.data.folders);
      } catch (error) {
        console.error(error);
      }
    };
    getFolders();
  }, [setFolders]);

  const createRootFolder = (newName: string) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/folder`,
        { name: newName, parent_id: null },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const newFolder = response.data;
        setFolders((prevFolders) => [...prevFolders, newFolder]);
        console.log("Folder created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating folder:", error);
      });
  };

  const createFolder = (parentId: string, folderName: string) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/folder`,
        {
          name: folderName,
          parent_id: parentId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const newFolder = response.data;
        setFolders((prev) => addFolderToParent(prev, parentId, newFolder));
      })
      .catch((error) => {
        console.error("Error creating folder:", error);
      });
  };

  const addFolderToParent = (
    nodes: Node[],
    parentId: string,
    newFolder: Node
  ): Node[] => {
    return nodes.map((node) => {
      if (node.id === parentId) {
        return {
          ...node,
          subfolders: [...(node.subfolders || []), newFolder], // Changed folders to subfolders
        };
      }
      if (node.subfolders) {
        return {
          ...node,
          subfolders: addFolderToParent(node.subfolders, parentId, newFolder), // Changed folders to subfolders
        };
      }
      return node;
    });
  };
  const createNote = (
    folderId: string,
    newNote: string,
    youtubeUrl: string
  ) => {
    if (!newNote.trim() || !youtubeUrl.trim()) {
      console.error("Note name and YouTube URL are required");
      return;
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/note`,
        {
          folder_id: folderId,
          name: newNote.trim(),
          youtube_url: youtubeUrl.trim(),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Update local state with new note
        setFolders((prev) =>
          prev.map((folder) => {
            if (folder.id === folderId) {
              return {
                ...folder,
                files: [...(folder.files || []), response.data],
              };
            }
            return folder;
          })
        );
        setContent(response.data.notes || "");
        setVideoId(response.data.video_id);
        router.push(`/dashboard/${newNote}`);
      })
      .catch((error) => {
        console.error("Error creating note:", error.response?.data || error);
      });
  };

  const deleteFolder = (folderId: string) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/folder/${folderId}`, {
        withCredentials: true,
      })
      .then((response) => {
        // Remove folder from state after successful deletion
        setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error deleting folder:", error);
      });
  };

  const renameFolder = (folderId: string, newName: string) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/folder`,
        {
          folder_id: folderId,
          new_name: newName,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        const updatedFolders = folders.map((folder) => {
          if (folder.id === folderId) {
            // Changed name to id
            return { ...folder, name: newName };
          }
          return folder;
        });
        setFolders(updatedFolders);
      })
      .catch((error) => {
        console.error("Error renaming folder:", error);
      });
  };

  const deleteFile = (fileId: string) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/note/${fileId}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Update local state by removing the deleted file
        setFolders((prev) =>
          prev.map((folder) => ({
            ...folder,
            files: folder.files?.filter((file) => file.id !== fileId) || [],
          }))
        );

        // Redirect to dashboard if response is successful
        if (response.status === 200) {
          router.push("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Error deleting note:", error.response?.data || error);
      });
  };

  const renameFile = (fileId: string, newName: string) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/rename_file`,
        {
          file_id: fileId,
          new_file_name: newName.trim(),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // Update local state
          setFolders((prev) =>
            prev.map((folder) => ({
              ...folder,
              files:
                folder.files?.map((file) =>
                  file.id === fileId ? { ...file, name: newName } : file
                ) || [],
            }))
          );
        }
      })
      .catch((error) => {
        console.error("Error renaming note:", error.response?.data || error);
      });
  };

  return (
    <div className="w-full py-4 pl-4 h-screen flex flex-col">
      {/* Header */}
      <div className="mb-10">
        <SideHeader />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Title and Tree View - This will scroll if content overflows */}
        <h2 className="flex items-center pl-2 gap-6 justify-start text-center mb-4 border-b pb-1 rounded">
          <Folder size={20} />
          <span> All Notes</span>
          <Button
            className="shadow-none bg-[#b19ffd] hover:bg-[#704cff]"
            onClick={() => {
              setIsRootFolderDialogOpen(true);
            }}
          >
            <Plus size={12} />
          </Button>
        </h2>
        <div className="flex-1 overflow-y-auto">
          <ul className="w-full">
            {folders.map((folder) => (
              <Node
                folder={folder}
                key={folder.id}
                siblings={folders}
                onRenameFile={renameFile}
                onDeleteFile={deleteFile}
                onCreateFolder={createFolder}
                onCreateNote={createNote}
                onDeleteFolder={deleteFolder}
                onRenameFolder={renameFolder}
              />
            ))}
          </ul>
        </div>

        {/* Bottom Component - This will stay fixed at bottom */}
        <div className="mt-auto border-t pt-2">
          <Bottom />
        </div>
      </div>
      <Dialog
        open={isRootFolderDialogOpen}
        onOpenChange={(open) => {
          setIsRootFolderDialogOpen(open);
          if (!open) {
            setNewFolderName("");
            setFolderNameError("");
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="rootfolder">Folder name</label>
              <input
                id="rootfolder"
                type="text"
                value={newFolderName}
                onChange={(e) => {
                  setNewFolderName(e.target.value);
                  // Clear error when user types
                  if (folderNameError) setFolderNameError("");
                }}
                className="rounded py-2 px-3 border outline-none"
                placeholder="Enter folder name"
                autoFocus
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setIsRootFolderDialogOpen(false);
                setNewFolderName("");
              }}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const trimmedName = newFolderName.trim();

                // Check for duplicate folder names
                if (folders.some((folder) => folder.name === trimmedName)) {
                  setFolderNameError("A folder with this name already exists");
                  return;
                }

                if (trimmedName) {
                  createRootFolder(trimmedName);
                  setIsRootFolderDialogOpen(false);
                  setNewFolderName("");
                  setFolderNameError("");
                }
              }}
              disabled={!newFolderName.trim()}
              className={`px-4 py-2 text-sm text-white rounded ${
                newFolderName.trim()
                  ? "bg-[#5d3fd3] hover:bg-[#4f35b3]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Create
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sidebar;
