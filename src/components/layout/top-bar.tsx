'use client'
import { useAuthContext } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '../ui/button';



export default function TopBar() {

    const pathname = usePathname();

    const isHome = pathname == "/";

    const { isAuthenticated, isAuthenticating } = useAuthContext();

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
                            {/* <Button onClick={onLogout}>Logout</Button> */}
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
                        </>
                        :
                        <></>
                }

            </div>
        </div>
    )
}
