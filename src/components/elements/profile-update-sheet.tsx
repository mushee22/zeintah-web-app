'use client'
import { useAuthContext } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { Pen } from "lucide-react";
import { useEffect, useState } from "react";
import ProfileEditForm from "../sections/profile/profile-edit-form";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import ProfileUpdate from "./profile-update";

export default function ProfileUpdateSheet() {

    const [isEditing, setIsEditing] = useState(false);

    const [isMobile, setIsMobile] = useState(false)

    const { open, setOpen } = useAuthContext();

    useEffect(() => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        setIsMobile(isMobile);
    }, [])


    const handleOnClose = (state: boolean) => {
        setOpen?.(state);
        setIsEditing(false);
    }

    return (
        <div>
            {
                isMobile ?
                    <Sheet open={open} onOpenChange={handleOnClose}>
                        <SheetContent title="" side="bottom" className={cn(isEditing ? 'h-[400px]' : 'h-[220px]', "p-5 border-0 transition-all duration-300 md:hidden")}>
                            <SheetTitle className={cn(isEditing ? '' : 'sr-only')}>
                                Edit Update
                            </SheetTitle>
                            <ProfileEditForm
                                isEditing={isEditing}
                                onCancel={() => setIsEditing(false)}
                                onUpdate={() => setIsEditing(true)}
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
                            />
                        </DialogContent>
                    </Dialog>
            }
        </div>
    )
}



export function UserDetails() {

    const { user, setOpen } = useAuthContext();

    return (
        <div className="flex gap-x-3 p-5 border bg-foreground/5 border-foreground/5 rounded-[20px]">
            <ProfileUpdate imageUrl={user?.profile_image} />
            <div className="flex flex-1 items-center">
                <div className="flex-1">
                    <p className='text-xl font-bold '>{user?.user?.first_name + ' ' + (user?.user?.last_name ?? '')}</p>
                    <p className='text-sm  text-foreground/50 '>{user?.user?.email}</p>
                </div>
                <div onClick={() => { setOpen?.(true) }} className="size-9 cursor-pointer flex flex-col justify-center items-center rounded-full bg-gradient-to-r from-foreground/10 to-foreground/5 backdrop-blur-2xl">
                    <Pen size={16} />
                </div>
            </div>
        </div>
    )
} 