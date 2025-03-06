"use client";
import { useContentContext } from "@/app/context/YoutubeContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { Folder, Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Bottom from "./Bottom";
import { default as Node } from "./Node";
import SideHeader from "./SideHeader";
import { Button } from "./ui/button";

type File = {
  id: string;
  name: string;
  folder_id: string;
  video_id: string;
  content: string;
};

const Sidebar = () => {
  const [folders, setFolders] = useState<Node[]>([]);
  const [newFolderName, setNewFolderName] = useState<string>("");
  const router = useRouter();
  const { setContent, setVideoId, setFileId } = useContentContext();
  const [isRootFolderDialogOpen, setIsRootFolderDialogOpen] =
    useState<boolean>(false);
  const [folderNameError, setFolderNameError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

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
        // console.log(typeof res.data.folders);
        // console.log(res.data);
        setFolders(res.data.folders);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getFolders();
  }, []);

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
        const newFolder = response.data.folder;
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
        const newFolder = response.data.folder;
        console.log("Inside Folder=>", response.data);
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
        console.log("Created Note=>", response.data);
        setFolders((prev) =>
          addFileToFolder(prev, folderId, response.data.note as File)
        );
        setContent(response.data.notes || "");
        setVideoId(response.data.video_id);
        setFileId(response.data.id);
        router.push(`/dashboard/${newNote}`);
      })
      .catch((error) => {
        console.error("Error creating note:", error.response?.data || error);
      });
  };

  const addFileToFolder = (
    nodes: Node[],
    folderId: string,
    newFile: File
  ): Node[] => {
    return nodes.map((node) => {
      // if this is the target folder add the file
      if (node.id === folderId) {
        return {
          ...node,
          files: [...(node.files || []), newFile],
        };
      }

      // Check subfolders recursively
      if (node.subfolders && node.subfolders.length > 0) {
        return {
          ...node,
          subfolders: addFileToFolder(node.subfolders, folderId, newFile),
        };
      }

      // Return the node unchanged if not the target folder and has no subfolders
      return node;
    });
  };

  const deleteFolder = (folderId: string) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/folder/${folderId}`, {
        withCredentials: true,
      })
      .then((response) => {
        // Update state by recursively removing the folder
        setFolders((prev) => removeFolderFromTree(prev, folderId));

        // Navigate to dashboard if needed
        router.push("/dashboard");

        console.log("Folder deleted:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting folder:", error);
      });
  };

  // Helper function to recursively remove a folder from the tree
  const removeFolderFromTree = (nodes: Node[], folderId: string): Node[] => {
    // First filter out the target folder if it's at this level
    const filteredNodes = nodes.filter((node) => node.id !== folderId);

    // Then recursively check subfolders
    return filteredNodes.map((node) => {
      // If this node has subfolders, recursively filter them too
      if (node.subfolders && node.subfolders.length > 0) {
        return {
          ...node,
          subfolders: removeFolderFromTree(node.subfolders, folderId),
        };
      }

      // Node has no subfolders, return as is
      return node;
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
        // Use recursive function to update folder name at any level
        setFolders((prev) => renameFolderInTree(prev, folderId, newName));
      })
      .catch((error) => {
        console.error("Error renaming folder:", error);
      });
  };

  // Helper function to recursively find and rename a folder
  const renameFolderInTree = (
    nodes: Node[],
    folderId: string,
    newName: string
  ): Node[] => {
    return nodes.map((node) => {
      // If this is the target folder, update its name
      if (node.id === folderId) {
        return {
          ...node,
          name: newName,
        };
      }

      // If this node has subfolders, recursively check them
      if (node.subfolders && node.subfolders.length > 0) {
        return {
          ...node,
          subfolders: renameFolderInTree(node.subfolders, folderId, newName),
        };
      }

      // Not the target folder and no subfolders to check
      return node;
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
        // Update local state by recursively finding and removing the deleted file
        setFolders((prev) => removeFileFromFolders(prev, fileId));

        // Redirect to dashboard if response is successful
        if (response.status === 200) {
          router.push("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Error deleting note:", error.response?.data || error);
      });
  };

  // Add this helper function to recursively remove files
  const removeFileFromFolders = (nodes: Node[], fileId: string): Node[] => {
    return nodes.map((node) => {
      // Create new node with filtered files array
      const updatedNode = {
        ...node,
        files: (node.files || []).filter((file) => file.id !== fileId),
      };

      // If the node has subfolders, recursively check them too
      if (node.subfolders && node.subfolders.length > 0) {
        updatedNode.subfolders = removeFileFromFolders(node.subfolders, fileId);
      }

      return updatedNode;
    });
  };

  const renameFile = (fileId: string, newName: string, folderId: string) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/rename_file`,
        {
          file_id: fileId,
          new_file_name: newName.trim(),
          folder_id: folderId,
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
          // Update local state with recursive function
          setFolders((prev) => renameFileInTree(prev, fileId, newName));
        }
      })
      .catch((error) => {
        console.error("Error renaming note:", error.response?.data || error);
      });
  };

  // Helper function to recursively find and rename a file
  const renameFileInTree = (
    nodes: Node[],
    fileId: string,
    newName: string
  ): Node[] => {
    return nodes.map((node) => {
      // Check if the file is in this folder's files
      if (node.files && node.files.length > 0) {
        return {
          ...node,
          files: node.files.map((file) =>
            file.id === fileId ? { ...file, name: newName } : file
          ),
        };
      }

      // If this node has subfolders, recursively check them
      if (node.subfolders && node.subfolders.length > 0) {
        return {
          ...node,
          subfolders: renameFileInTree(node.subfolders, fileId, newName),
        };
      }

      // No files or subfolders match, return unchanged
      return node;
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
        {loading ? (
          <div className="h-full w-full flex items-center justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
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
        )}

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
