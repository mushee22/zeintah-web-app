'use client'
import Logo from "@/assets/images/zeintah-logo.svg"
import { useAuthContext } from '@/context/auth-context'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ProfileIcon } from '../elements/icons'
import { Menu, menues } from './mobile-nav-bar'

export default function SideBar() {

  const { setOpen } = useAuthContext()

  return (
    <nav className={cn('fixed hidden  z-20 pt-8 inset-y-0  md:flex flex-col  ')}
      style={{
        // background: "linear-gradient(90deg, rgba(0, 0, 0, 0.47) 0%, rgba(0, 0, 0, 0.46) 100%)",
        // backdropFilter: "blur(60px)"
      }}
    >
      <div className="pl-4">
      <Image
        src={Logo}
        alt="Zeintah Logo"
        className="size-9"
      />
      </div>
      <div className="mt-2">
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
      </div>
      <div onClick={() => { setOpen?.(true) }} className="md:hidden">
        <ProfileIcon isActive={false} />
      </div>
    </nav>
  )
}
