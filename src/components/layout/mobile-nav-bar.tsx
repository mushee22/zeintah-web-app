"use client";
import {
  CommiunityIcon,
  LearnIcon,
  ProfileIcon,
} from "@/components/elements/icons";


import { useAuthContext } from "@/context/auth-context";
import { nunito } from "@/lib/font";
import { cn } from "@/lib/utils";
// import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import ProfileDropdown from "../elements/profile-dropdown";

export default function MobileNavBar() {
  const { setOpen } = useAuthContext();
  

  return (
    <div
      className={cn(
        "fixed z-20 bottom-0 inset-x-0 md:inset-y-0 md:w-[230px] max-md:h-[83px] md:pt-8 flex md:flex-col max-md:items-center max-md:justify-around"
      )}
      style={{
        background:
          "linear-gradient(90deg, rgba(0, 0, 0, 0.47) 0%, rgba(0, 0, 0, 0.46) 100%)",
        backdropFilter: "blur(60px)",
      }}
    >
      <>
        {menues.map((menu) => (
          <Menu
            asPath={menu.asPath}
            icon={menu.icon}
            key={menu.title}
            title={menu.title}
            path={menu.path}
          />
        ))}
        <UserProfileUpdate
          title="Profile"
          isActive={false}
          onClick={() => {
            setOpen?.(true);
          }}
        />
        {/* Desktop Logout Button */}
        <div className="hidden md:block mt-auto mb-4">
          {/* <button
            onClick={() => setShowLogoutModal(true)}
            className={cn(
              nunito.className,
              "cursor-pointer flex text-base text-primary flex-row py-3 px-4 gap-x-2 hover:bg-gradient-to-l hover:from-foreground/5 hover:to-foreground/10 w-full"
            )}
          >
            <LogOut size={20} className="text-white" />
            <span className="text-sm text-white">Logout</span>
          </button> */}
          <ProfileDropdown />
        </div>
      </>
     
    </div>
  );
}

export const Menu = ({
  title,
  path,
  asPath,
  icon: Icon,
}: {
  title: string;
  path: string;
  asPath: string;
  icon: ({ isActive }: { isActive: boolean }) => ReactElement;
}) => {
  const pathname = usePathname();

  const isActive =
    pathname === "/" && path == "/"
      ? true
      : pathname.includes(asPath)
      ? true
      : false;

  return (
    <Link
      href={path}
      key={title}
      className={cn(
        nunito.className,
        "cursor-pointer flex text-[10px]  md:text-base text-primary flex-col md:flex-row  md:py-3 md:px-4  gap-x-2 max-md:justify-center items-center md:hover:bg-gradient-to-l md:hover:from-foreground/5 md:to-foreground/10"
      )}
    >
      <Icon isActive={isActive} />
      <span
        className={cn(
          isActive
            ? "bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text"
            : "text-muted",
          "md:text-sm",
          ""
        )}
      >
        {title}
      </span>
    </Link>
  );
};

export const menues = [
  {
    title: "Community",
    path: "/community",
    asPath: "community",
    icon: CommiunityIcon,
  },
  {
    title: "Learn",
    path: "/",
    asPath: "course",
    icon: LearnIcon,
  },
];

export const UserProfileUpdate = ({
  title,
  isActive,
  onClick,
}: {
  title: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        nunito.className,
        "cursor-pointer flex text-[10px]  md:text-base text-primary flex-col md:flex-row  md:py-3 md:px-4  gap-x-2 max-md:justify-center items-center md:hover:bg-gradient-to-l md:hover:from-foreground/5 md:to-foreground/10"
      )}
    >
      <ProfileIcon isActive={false} />
      <span
        className={cn(
          isActive
            ? "bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text"
            : "text-muted",
          "md:text-sm",
          ""
        )}
      >
        {title}
      </span>
    </button>
  );
};
