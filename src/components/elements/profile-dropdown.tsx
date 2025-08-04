import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronsUpDown, LogOut, MessageSquare, } from "lucide-react";
import Link from "next/link";
import LogoutConfirmationAlert from "./logout-confirmation-alert";
import { useAuthContext } from "@/context/auth-context";
import { getImageURL } from "@/lib/fetch";
import { getInitials } from "./post-card/utils";

export default function ProfileDropdown() {
  const { user, onLogout } = useAuthContext();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [open, setOpen] = useState(false);

  if(!user) return null;

  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            
            className="relative outline-0 border-0 h-auto py-2 focus-visible:ring-0 focus:ring-0 focus:outline-0 ring-0 rounded-none hover:bg-gradient-to-l hover:from-foreground/5 hover:to-foreground/10  gap-x-2 flex items-center "
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={getImageURL(user?.profile_image ?? "")} />
              <AvatarFallback>
                {getInitials(
                  user?.user?.first_name ?? "",
                  user?.user?.last_name ?? ""
                )}
              </AvatarFallback>
            </Avatar>
            <div className="flex  items-start flex-1">
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">
                  {user?.user?.first_name ?? ""} {user?.user?.last_name ?? ""}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user?.user?.email ?? ""}
                </span>
              </div>
            </div>
            <ChevronsUpDown size={20} className="text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="left"
          className="bg-background border-white/10"
        >
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href={`/profile/${user?.id}`}>
              <MessageSquare size={20} className="text-white" />
              <span className="text-sm text-white">View Posts</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            setShowLogoutModal(true);
            setOpen(false)
          }}>
            <LogOut size={20} className="text-white" />
            <span className="text-sm text-white">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutConfirmationAlert
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
        onLogout={onLogout}
      />
    </div>
  );
}
