import dynamic from "next/dynamic";
import { Facebook, Twitter, Linkedin, MessageCircle, Copy } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { useToast } from "../ui/toast-provider";

// Dynamic imports for heavy social sharing components
const FacebookShareButton = dynamic(() => import("react-share").then(mod => ({ default: mod.FacebookShareButton })), {
  ssr: false,
  loading: () => <div className="flex gap-x-2 items-center">
    <Facebook className="w-4 h-4 mr-2" />
    <span className="hidden sm:inline">Facebook</span>
  </div>
});

const TwitterShareButton = dynamic(() => import("react-share").then(mod => ({ default: mod.TwitterShareButton })), {
  ssr: false,
  loading: () => <div className="flex gap-x-2 items-center">
    <Twitter className="w-4 h-4 mr-2" />
    <span className="hidden sm:inline">Twitter</span>
  </div>
});

const LinkedinShareButton = dynamic(() => import("react-share").then(mod => ({ default: mod.LinkedinShareButton })), {
  ssr: false,
  loading: () => <div className="flex gap-x-2 items-center">
    <Linkedin className="w-4 h-4 mr-2" />
    <span className="hidden sm:inline">LinkedIn</span>
  </div>
});

const WhatsappShareButton = dynamic(() => import("react-share").then(mod => ({ default: mod.WhatsappShareButton })), {
  ssr: false,
  loading: () => <div className="flex gap-x-2 items-center">
    <MessageCircle className="w-4 h-4 mr-2" />
    <span className="hidden sm:inline">WhatsApp</span>
  </div>
});

interface SocialShareProps extends React.PropsWithChildren {
  url: string;
  title: string;
  description?: string;
  hashtags?: string[];
}

const ShareDropdown: React.FC<SocialShareProps> = ({
  title,
  description,
  hashtags,
  children,
  url
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const { showToast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      showToast({
        title: "Copied to clipboard",
        variant: "success",
      });
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      showToast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  const shareButtons = [
    {
      Component: FacebookShareButton,
      icon: Facebook,
      label: "Facebook",
      props: {
        url,
        title,
        description,
        hashtags,
      },
    },
    {
      Component: TwitterShareButton,
      icon: Twitter,
      label: "Twitter",
      props: {
        url,
        title,
        description,
        hashtags,
      },
    },
    {
      Component: LinkedinShareButton,
      icon: Linkedin,
      label: "LinkedIn",
      props: {
        url,
        title,
        description,
        hashtags,
      },
    },
    {
      Component: WhatsappShareButton,
      icon: MessageCircle,
      label: "WhatsApp",
      props: {
        url,
        title,
      },
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {shareButtons.map(({ Component, icon: Icon, label, props }, index) => (
          <DropdownMenuItem
            key={index}
            className="cursor-pointer"
          >
            <Component className="flex gap-x-2" key={index} {...props}>
              <Icon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">
                {label.split(" on ")[1] || label.split(" via ")[1] || "Email"}
              </span>
            </Component>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={copyToClipboard}>
          <Copy className="w-4 h-4 mr-2" />
          {isCopied ? "Copied" : "Copy Link"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareDropdown;
