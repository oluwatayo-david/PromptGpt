"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";

const PromptCard = ({ post, handleEdit, openDeleteDialog, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [providers, setProviders] = useState(null);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    const getSetUpProvider = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    getSetUpProvider();
  }, []);

  const handleProfileClick = () => {
    if (!session) return handleOpenModal();
    if (post.creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };
{/**handle redirects when you sign in by the modal */}
  const handleRedirect = async (providerId) => {
    try {
      const result = await signIn(providerId);
      if (result.ok) {
        if (post.creator._id === session?.user.id) {
          return router.push("/profile");
        }
        router.push(
          `/profile/${post.creator._id}?name=${post.creator.username}`
        );
      }
    } catch (error) {}
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <>
      {openModal && (
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop with z-index behind the dialog */}
          <DialogBackdrop className="absolute inset-0 z-40 bg-black/30" />

          {/* Center the dialog panel */}
          <div className="relative z-50 flex items-center justify-center w-full h-full">
            <DialogPanel className="max-w-md p-6 mx-auto text-center rounded-lg shadow-lg bg-white/95">
              <DialogTitle className="mb-4 text-lg font-bold">
                Sign in
              </DialogTitle>

              <p className="mb-6">please sign in to continue</p>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setOpenModal(false)}
                  className="rounded-full border  py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center bg-red-500"
                >
                  Cancel
                </button>
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => handleRedirect(provider.id)}
                      className="black_btn"
                    >
                      Sign in
                    </button>
                  ))}
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
      <div className="prompt_card">
        <div className="flex items-start justify-between gap-5">
          <div
            className="flex items-center justify-start flex-1 gap-3 cursor-pointer"
            onClick={handleProfileClick}
          >
            <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="object-contain rounded-full"
            />

            <div className="flex flex-col">
              <h3 className="font-semibold text-gray-900 font-satoshi">
                {post.creator.username}
              </h3>
              <p className="text-sm text-gray-500 font-inter">
                {post.creator.email}
              </p>
            </div>
          </div>

          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={
                copied === post.prompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              alt={copied === post?.prompt ? "tick_icon" : "copy_icon"}
              width={12}
              height={12}
            />
          </div>
        </div>

        <p className="my-4 text-sm text-gray-700 font-satoshi">
          {post?.prompt}
        </p>
        <p
          className="text-sm cursor-pointer font-inter blue_gradient"
          onClick={() => {
            handleTagClick && handleTagClick(post?.tag);
          }}
        >
          #{post?.tag}
        </p>

        {session?.user.id === post.creator._id && pathName === "/profile" && (
          <div className="gap-4 pt-3 mt-5 border-t border-gray-100 flex-center">
            <p
              className="text-sm cursor-pointer font-inter green_gradient"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="text-sm cursor-pointer font-inter orange_gradient"
              onClick={openDeleteDialog}
            >
              Delete
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default PromptCard;
