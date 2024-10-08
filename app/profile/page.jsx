"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/NotificationContainer";
import Profile from "@/components/Profile";

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);

  let [isOpen, setIsOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
  
    const fetchPosts = async () => {
      if (!session) return router.push("/");
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async () => {
    if (!postToDelete?._id) return; // Ensure postToDelete exists

    try {
      await fetch(`/api/prompt/${postToDelete?._id}`, {
        method: "DELETE",
      });

      // Update the post list after deletion
      const filteredPosts = myPosts.filter(
        (item) => item._id !== postToDelete._id
      );

      setMyPosts(filteredPosts);
      showSuccessToast("Prompt deleted successfully");
      setIsOpen(false); // Close the dialog
    } catch (error) {
      showErrorToast("Error deleting prompt");
    }
  };

  const openDeleteDialog = (post) => {
    setPostToDelete(post); // Set the specific post to delete
    setIsOpen(true);
  };

  return (
    <>
      <Profile
        name="My"
        desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
        data={myPosts}
        handleEdit={handleEdit}
        openDeleteDialog={openDeleteDialog}
      />
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop with z-index behind the dialog */}
          <DialogBackdrop className="absolute inset-0 z-40 bg-black/30" />

          {/* Center the dialog panel */}
          <div className="relative z-50 flex items-center justify-center w-full h-full">
            <DialogPanel className="max-w-md p-6 mx-auto text-center rounded-lg shadow-lg bg-white/95">
              <DialogTitle className="mb-4 text-lg font-bold">
                Delete prompt
              </DialogTitle>
              <Description className="mb-6 text-sm text-gray-600">
                This will delete the prompt permanently.
              </Description>
              <p className="mb-6">
                Are you sure you want to delete the prompt?
              </p>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default MyProfile;
