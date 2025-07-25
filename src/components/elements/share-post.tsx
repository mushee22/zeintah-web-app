"use client";

import React from "react";
import Modal from "./modal";
import { Button } from "../ui/button";
import { Copy, Link, Share2, Twitter, Facebook, Linkedin } from "lucide-react";
import { useToast } from "../ui/toast-provider";

interface SharePostProps {
  open: boolean;
  onClose: (open: boolean) => void;
  postId: number;
  title?: string;
  description?: string;
}

export default function SharePost({ open, onClose, postId, title, description }: SharePostProps) {
  const { showToast } = useToast();

  const postUrl = `${window.location.origin}/post/${postId}`;
  const shareText = title ? `${title} - ${description}` : "Check out this post";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      showToast({
        title: "Link copied!",
        description: "Post link has been copied to your clipboard.",
        variant: "success",
        duration: 2000,
      });
    } catch {
      showToast({
        title: "Failed to copy",
        description: "Please try copying the link manually.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank');
  };

  const shareViaNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || "Check out this post",
          text: description || "Interesting post from the community",
          url: postUrl,
        });
      } catch {
        // User cancelled or error occurred
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback to copy link
      copyToClipboard();
    }
  };

  return (
    <Modal open={open} onOpenChange={onClose}>
      <div className="p-6 max-w-md">
        <h2 className="text-xl font-semibold mb-4">Share Post</h2>
        
        <div className="space-y-4">
          {/* Native Share */}
          <Button
            onClick={shareViaNative}
            className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-black font-medium"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </Button>

          {/* Social Media Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={shareOnTwitter}
              className="flex flex-col items-center py-3"
            >
              <Twitter className="w-5 h-5 mb-1" />
              <span className="text-xs">Twitter</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={shareOnFacebook}
              className="flex flex-col items-center py-3"
            >
              <Facebook className="w-5 h-5 mb-1" />
              <span className="text-xs">Facebook</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={shareOnLinkedIn}
              className="flex flex-col items-center py-3"
            >
              <Linkedin className="w-5 h-5 mb-1" />
              <span className="text-xs">LinkedIn</span>
            </Button>
          </div>

          {/* Copy Link */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Link className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Copy Link</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={postUrl}
                readOnly
                className="flex-1 px-3 py-2 text-sm border rounded-md bg-muted"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="shrink-0"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={() => onClose(false)}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
} 