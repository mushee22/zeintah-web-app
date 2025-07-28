'use client'
import { useAuthContext } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '../ui/button';



export default function TopBar() {

    const pathname = usePathname();

    const isHome = pathname == "/";

    const { isAuthenticated, isAuthenticating, onLogout } = useAuthContext();

    if (isAuthenticating || !isHome) {
        return <></>
    }

    return (
        <div className=' z-0 pt-3 hidden  md:flex items-center justify-between pr-6'>
            <div className='flex justify-end w-full gap-x-2'>
                {
                    !isAuthenticated && <Link href="/sign-in" className={cn(buttonVariants({
                        size: "default",
                        variant: "link",
                    }))}>Login</Link>
                }

                {
                    isAuthenticated ?
                        <>
                            <Link href="/course" className={cn(buttonVariants({
                                size: "default",
                                variant: "link",
                            }))}>Learn</Link>
                            <Link href="/community" className={cn(buttonVariants({
                                size: "default",
                                variant: "link",
                            }))}>Community</Link>
                            <Link href="/profile" className={cn(buttonVariants({
                                size: "default",
                                variant: "link",
                            }))}>Profile</Link>
                            <button 
                                onClick={onLogout}
                                className={cn(buttonVariants({
                                    size: "default",
                                    variant: "link",
                                }), "flex items-center gap-x-1 text-red-500 hover:text-red-600")}
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </>
                        :
                        <></>
                }

            </div>
        </div>
    )
}
