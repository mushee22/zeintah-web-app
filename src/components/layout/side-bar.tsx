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
    <nav className={cn('fixed hidden  z-20 pl-6  inset-y-0  md:flex flex-col  items-center justify-center')}
      style={{
        // background: "linear-gradient(90deg, rgba(0, 0, 0, 0.47) 0%, rgba(0, 0, 0, 0.46) 100%)",
        // backdropFilter: "blur(60px)"
      }}
    >
      <Image
        src={Logo}
        alt="Zeintah Logo"
        className="absolute top-8"
      />
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
      <div onClick={() => { setOpen?.(true) }} className="md:hidden">
        <ProfileIcon isActive={false} />
      </div>
    </nav>
  )
}
