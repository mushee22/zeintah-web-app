'use client'
import { useAuthContext } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { LogOut, Pen } from "lucide-react";
import { useEffect, useState } from "react";
import ProfileEditForm from "../sections/profile/profile-edit-form";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import { useToast } from "../ui/toast-provider";
import ProfileUpdate from "./profile-update";
import SuccessPopup from "./success-popup";

export default function ProfileUpdateSheet() {

    const [isEditing, setIsEditing] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const { open, setOpen } = useAuthContext();
    const { showToast } = useToast();

    useEffect(() => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        setIsMobile(isMobile);
    }, [])

    const handleOnClose = (state: boolean) => {
        setOpen?.(state);
        setIsEditing(false);
    }

    const handleProfileUpdateSuccess = () => {
        if (isMobile) {
            setShowSuccessPopup(true);
        } else {
            showToast({
                title: "Profile Updated!",
                description: "Your profile has been successfully updated.",
                variant: "success",
                duration: 3000
            });
        }
        setIsEditing(false);
        setOpen?.(false);
    }

    const handleSuccessPopupClose = () => {
        setShowSuccessPopup(false);
    }

    return (
        <div>
            {
                isMobile ?
                    <Sheet open={open} onOpenChange={handleOnClose}>
                        <SheetContent title="" side="bottom" className={cn(isEditing ? 'h-[430px]' : 'h-[220px]', "p-5 border-0 transition-all duration-300 md:hidden")}>
                            <SheetTitle className={cn(isEditing ? '' : 'sr-only')}>
                                Edit Update
                            </SheetTitle>
                            <ProfileEditForm
                                isEditing={isEditing}
                                onCancel={() => setIsEditing(false)}
                                onUpdate={() => setIsEditing(true)}
                                onSuccess={handleProfileUpdateSuccess}
                            />
                        </SheetContent>
                    </Sheet>
                    :
                    <Dialog open={open} onOpenChange={handleOnClose}>
                        <DialogContent className="">
                            <DialogTitle className={cn(isEditing ? '' : 'sr-only')}>Edit Update</DialogTitle>
                            <ProfileEditForm
                                isEditing={true}
                                onCancel={() => setOpen?.(false)}
                                onUpdate={() => setIsEditing(true)}
                                onSuccess={handleProfileUpdateSuccess}
                            />
                        </DialogContent>
                    </Dialog>
            }
            
            {/* Success Popup for Mobile Only */}
            <SuccessPopup
                isOpen={showSuccessPopup}
                onClose={handleSuccessPopupClose}
                title="Profile Updated!"
                description="Your profile has been successfully updated."
                duration={3000}
            />
        </div>
    )
}



export function UserDetails() {

    const { user, setOpen, onLogout } = useAuthContext();

    return (
        <div className="flex gap-x-3 p-5 border bg-foreground/5 border-foreground/5 rounded-[20px]">
            <ProfileUpdate imageUrl={user?.profile_image} />
            <div className="flex flex-1 items-center">
                <div className="flex-1">
                    <p className='text-xl font-bold '>{user?.user?.first_name + ' ' + (user?.user?.last_name ?? '')}</p>
                    <p className='text-sm  text-foreground/50 '>{user?.user?.email}</p>
                </div>
                <div className="flex gap-x-2">
                    <div onClick={() => { setOpen?.(true) }} className="size-9 cursor-pointer flex flex-col justify-center items-center rounded-full bg-gradient-to-r from-foreground/10 to-foreground/5 backdrop-blur-2xl">
                        <Pen size={16} />
                    </div>
                    <div onClick={onLogout} className="size-9 cursor-pointer flex flex-col justify-center items-center rounded-full bg-gradient-to-r from-red-500/10 to-red-500/5 backdrop-blur-2xl">
                        <LogOut size={16} />
                    </div>
                </div>
            </div>
        </div>
    )
} 