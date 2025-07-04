
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Lock, LogOut, PencilIcon } from 'lucide-react'

import { useAuthContext } from '@/context/auth-context'
import { useRouter } from 'next/navigation'


export default function ProfileSettingsMenu() {

    const router = useRouter();

    const { onLogout, user } = useAuthContext();

    const handlOnEdit = async () => {
        router.push(`/profile/${user?.id}/edit`);
    }

    const handlOnUpdatePasssword = async () => {
        router.push(`/profile/${user?.id}/update-password`);
    }


    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="default" className='w-9 h-9 rounded-full bg-gradient-to-b from-foreground/5 to-foreground/10 hover:bg-foreground/10'>
                        <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 0C3.03043 0 3.53914 0.210714 3.91421 0.585787C4.28929 0.96086 4.5 1.46957 4.5 2C4.5 2.53043 4.28929 3.03914 3.91421 3.41421C3.53914 3.78929 3.03043 4 2.5 4C1.96957 4 1.46086 3.78929 1.08579 3.41421C0.710714 3.03914 0.5 2.53043 0.5 2C0.5 1.46957 0.710714 0.96086 1.08579 0.585787C1.46086 0.210714 1.96957 0 2.5 0ZM9.5 0C10.0304 0 10.5391 0.210714 10.9142 0.585787C11.2893 0.96086 11.5 1.46957 11.5 2C11.5 2.53043 11.2893 3.03914 10.9142 3.41421C10.5391 3.78929 10.0304 4 9.5 4C8.96957 4 8.46086 3.78929 8.08579 3.41421C7.71071 3.03914 7.5 2.53043 7.5 2C7.5 1.46957 7.71071 0.96086 8.08579 0.585787C8.46086 0.210714 8.96957 0 9.5 0Z" fill="white" />
                        </svg>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent  className=" bg-background border-foreground/50">
                    <DropdownMenuItem onClick={handlOnEdit} className='hover:bg-foreground/15 cursor-pointer'>
                        Edit
                        <DropdownMenuShortcut>
                            <PencilIcon />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handlOnUpdatePasssword} className='hover:bg-foreground/15 cursor-pointer'>
                        Update Password
                        <DropdownMenuShortcut>
                            <Lock />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onLogout} className='hover:bg-foreground/15 cursor-pointer'>
                        Log out
                        <DropdownMenuShortcut>
                            <LogOut />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
