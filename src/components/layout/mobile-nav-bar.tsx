"use client"
import { CommiunityIcon, LearnIcon, ProfileIcon } from "@/components/elements/icons"

import { useAuthContext } from "@/context/auth-context"
import { nunito } from '@/lib/font'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactElement } from "react"



export default function MobileNavBar() {

    const { setOpen } = useAuthContext()

    return (
        <div className={cn('fixed z-20 bottom-0 inset-x-0  flex h-[83px] md:hidden  items-center justify-around')}
            style={{
                background: "linear-gradient(90deg, rgba(0, 0, 0, 0.47) 0%, rgba(0, 0, 0, 0.46) 100%)",
                backdropFilter: "blur(60px)"
            }}
        >
            {
                menues.map((menu) => (
                    <Menu
                        asPath={menu.asPath}
                        icon={menu.icon}
                        key={menu.title}
                        title={menu.title}
                        path={menu.path}
                    />
                ))
            }
            <div onClick={() => { setOpen?.(true) }} className="md:hidden flex flex-col items-center text-[10px]">
                <ProfileIcon isActive={false} />
                 <span className={cn( "text-muted", 'lg:hidden', '')}>Profile</span>
            </div>
        </div>
    )
}

export const Menu = ({ title, path, asPath, icon: Icon }:
    {
        title: string, path: string, asPath: string, icon: ({ isActive }: {
            isActive: boolean;
        }) => ReactElement
    }) => {

    const pathname = usePathname();

    const isActive = pathname === "/" && path == "/" ? true : pathname.includes(asPath) ? true : false;

    return (
        <Link href={path} key={title} className={cn(nunito.className, 'cursor-pointer flex text-[10px]  md:text-base text-primary flex-col md:flex-row md:py-3 md:px-4 md:justify-start gap-x-2 justify-center items-center md:hover:bg-gradient-to-l md:hover:from-foreground/5 md:to-foreground/10')}>
            <Icon isActive={isActive} />
            <span className={cn(isActive ? "bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text" : 'text-muted', 'md:hidden', '')}>{title}</span>
        </Link>
    )
}


export const menues = [
    {
        title: "Community",
        path: "/community",
        asPath: "community",
        icon: CommiunityIcon
    },
    {
        title: "Learn",
        path: "/",
        asPath: "course",
        icon: LearnIcon
    },
]

