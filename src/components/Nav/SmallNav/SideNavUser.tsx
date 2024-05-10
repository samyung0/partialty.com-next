import {
  LogOut,
  PencilLine,
  Shield,
  User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "~/components/Separator"
import { getUser } from "~/auth/getUser";
import { LogoutButtonSideNav } from "./LogoutButtonSideNav";

export const SideNavUserIcon = async () => {
  const user = await getUser();
  return (
    <>
      {user && (
        <div
          className={" ml-auto flex -translate-x-[8px] gap-2 sm:translate-x-0"}
        >
          <span className="relative">
            <Image
              src={user.avatar_url}
              alt="Avatar"
              width={35}
              height={35}
              className="rounded-full object-contain"
              referrerPolicy="no-referrer"
            />
            {user.role !== "free" && (
              <Image
                src={"/img/crown.png"}
                width={15}
                height={15}
                alt="Crown"
                className="absolute right-[-12px] top-[-12px]"
              />
            )}
          </span>
        </div>
      )}
      {!user && (
        <span>
          <Link prefetch href={"/login"} className="whitespace-nowrap">
            Login | Signup
          </Link>
        </span>
      )}
    </>
  );
};

export const SideNavUserNav = async () => {
  const user = await getUser();
  return (
    user && (
      <>
        <Separator />
        <li>
          <Link prefetch href="/profile/" className="flex items-center gap-4">
            <span className="whitespace-nowrap">My Profile</span>
            <span>
              <User2 className="size-[20px]" />
            </span>
          </Link>
        </li>
        {user.role !== "free" && (
          <li>
            <a
              href="https://qwik.partialty.com/creator/"
              target="_blank"
              className="flex items-center gap-4"
            >
              <span className="whitespace-nowrap">Creator</span>
              <span className="text-[20px]">
                <PencilLine className="size-[20px]" />
              </span>
            </a>
          </li>
        )}
        {user.role === "admin" && (
          <li>
            <a
              href="https://qwik.partialty.com/admin"
              target="_blank"
              className="flex items-center gap-4"
            >
              <span className="whitespace-nowrap">Admin</span>
              <span>
                <Shield className="size-[20px]" />
              </span>
            </a>
          </li>
        )}
        <li>
          <LogoutButtonSideNav />
        </li>
      </>
    )
  );
};
