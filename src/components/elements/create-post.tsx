"use client";
import useMobile from "@/hook/use-mobile";
import { queryClient } from "@/lib/client";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "../ui/toast-provider";
import CreatePostForm from "./create-post-form";
import SuccessPopup from "./success-popup";
import Modal from "./modal";
import { useAuthContext } from "@/context/auth-context";

export default function CreatePost() {
  const { isAuthenticated } = useAuthContext();

  const [open, setOpen] = useState<boolean>(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
  const { showToast } = useToast();

  const { isMobile } = useMobile();

  const handleOnOpenSheet = () => {
    setOpen(true);
  };

  const handleOnClose = (state: boolean) => {
    setOpen(state);
  };

  const handleOnSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["ideas"] });
    handleOnClose(false);

    // Show success notification based on device type
    if (isMobile) {
      setShowSuccessPopup(true);
    } else {
      showToast({
        title: "Post Created Successfully!",
        description:
          "Your post has been published and is now visible to the community.",
        variant: "success",
        duration: 4000,
      });
    }
  };

  return (
    <div className="fixed bottom-[120px] md:bottom-5 right-8">
      {isAuthenticated && (
        <button
          onClick={handleOnOpenSheet}
          className="aspect-square w-14  rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary z-40 flex items-center justify-center cursor-pointer"
        >
          <Plus className="text-black" />
        </button>
      )}
      <Modal className="p-0" open={open} onOpenChange={handleOnClose}>
        <div className="max-h-[75vh] overflow-y-auto no-scrollbar ">
          <h2 className="text-xl font-semibold mb-4 px-4 pt-4">Create Post</h2>
          <CreatePostForm onSuccess={handleOnSuccess} />
        </div>
      </Modal>
      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        title="Post Created Successfully!"
        description="Your post has been published and is now visible to the community."
        duration={4000}
      />
    </div>
  );
}
