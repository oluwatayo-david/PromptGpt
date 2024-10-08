"use client";

import { useEffect, useState, Suspense } from "react"; // Import Suspense
import { useRouter, useSearchParams } from "next/navigation";
import {
  showSuccessToast,
  showErrorToast,
} from "@/components/NotificationContainer";
import Form from "@/components/Form";
import Image from "next/image";

const UpdatePromptContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return showErrorToast("missing prompt id");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
      showSuccessToast("prompt updated successfully");
    } catch (error) {
      showErrorToast("error updating prompt");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

const UpdatePrompt = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-full h-screen">
          <Image
            src="../public/assets/icon/loader.svg"
            width={100}
            height={100}
            alt="loader"
          />
        </div>
      }
    >
      <UpdatePromptContent />
    </Suspense>
  );
};

export default UpdatePrompt;
