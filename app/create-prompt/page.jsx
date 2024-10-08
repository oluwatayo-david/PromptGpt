"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/NotificationContainer";

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  // Function to trigger a success toast
  const handleSuccess = () => {
    showSuccessToast("prompt created successfully");
  };

  // Function to trigger an error toast
  const handleError = () => {
    showErrorToast("error creating prompt");
  };

  const createPrompt = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
   
      return handleSuccess();
    } catch (error) {
      return handleError();
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </>
  );
};

export default page;
