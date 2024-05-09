"use client";

import {
  ChevronDown,
  Home,
  LogOut,
  PencilLine,
  Shield,
  User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { Loader } from "~/components/Loader";
import { ThemeSwitch } from "~/components/ThemeSwitch";
import roles from "~/const/roles";
import { clientAuthContext } from "~/context/ClientAuthContext";
import { cn } from "~/lib/utils";
import { getUser, logout } from "~/server/profiles";
import { SmallNav } from "../SmallNav";

export function Dropdown({
  role,
  avatar_url,
}: {
  role: (typeof roles)[number];
  avatar_url: string;
}) {
  return (
    <div className=" [&:hover>div>span:last-child]:rotate-180 [&:hover>div]:flex px-4 py-2">
      <div className={"flex gap-2"}>
        <span className="relative">
          <Image
            src={avatar_url}
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full object-contain"
            referrerPolicy="no-referrer"
          />
          {role !== "free" && (
            <Image
              src={"/img/crown.png"}
              width={20}
              height={20}
              alt="Crown"
              className="absolute right-[-15px] top-[-15px] max-w-[unset]"
            />
          )}
        </span>

        <span
          className={
            "inline-flex items-center text-primary-dark-gray transition-transform dark:text-background-light-gray"
          }
        >
          <ChevronDown className="size-[16px]" />
        </span>
      </div>
      <div className="absolute left-[0] top-[100%] z-[50] hidden w-[180px] -translate-x-[50%] pt-2 font-bold xl:left-[50%]">
        <div
          className={
            "flex-1 rounded-xl border-2 border-primary-dark-gray bg-background-light-gray text-primary-dark-gray dark:border-disabled-dark dark:bg-highlight-dark dark:text-background-light-gray"
          }
        >
          <ul className="flex flex-col p-2">
            <ListItem title="Home" href="/members/dashboard">
              <Home className="size-[20px]" />
            </ListItem>
            <ListItem title="Profile" href="/members/profile">
              <User2 className="size-[20px]" />
            </ListItem>
            {role !== "free" && (
              <ListItem
                title="Creator"
                href="https://qwik.partialty.com/creator"
              >
                <PencilLine className="size-[20px]" />
              </ListItem>
            )}
            {role === "admin" && (
              <ListItem title="Admin" href="https://qwik.partialty.com/admin/">
                <Shield className="size-[20px]" />
              </ListItem>
            )}
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const LogoutButton = () => {
  return (
    <form action={logout}>
      <button type="submit" className="flex items-center gap-3 p-2">
        <span>
          <LogOut className="size-[20px]" />
        </span>
        <span>Logout</span>
      </button>
    </form>
  );
};

const ListItem = ({
  className,
  title,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"a">) => {
  return (
    <li className="p-2">
      <Link
        prefetch
        href={props.href ?? ""}
        className={cn("flex items-center gap-3", className)}
      >
        <span>{children}</span>
        <span className="whitespace-nowrap">{title}</span>
      </Link>
    </li>
  );
};

export const PublicNav = () => {
  const clientAuth = useContext(clientAuthContext);

  return (
    <>
      <div className="block lg:hidden">
        <SmallNav />
      </div>
      <div className="hidden shadow shadow-slate-200/80 ring-1 ring-slate-900/5 dark:shadow-slate-600/80 lg:block">
        <nav className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-8 ">
          <div className="inline-flex w-[250px] items-center gap-2">
            <Image
              src={"/svg/partialty.svg"}
              width="15"
              height="15"
              alt="icon"
            />
            <h2 className="font-mosk text-lg tracking-wide">
              <Link prefetch href="/">
                Partialty.com
              </Link>
            </h2>
          </div>
          <div className="inline-flex items-center gap-8">
            <a
              href="/members/dashboard/"
              className="text-gray-500 transition-colors hover:text-black dark:text-gray-300 dark:hover:text-background-light-gray"
            >
              Home
            </a>
            <a
              href="/catalog/"
              className="text-gray-500 transition-colors hover:text-black dark:text-gray-300 dark:hover:text-background-light-gray"
            >
              Courses
            </a>
          </div>
          <div className="inline-flex w-[250px] items-center">
            <ul className="flex items-center gap-4">
              <li>
                <ThemeSwitch />
              </li>
              {clientAuth.loading && (
                <li className="px-6">
                  <Loader />
                </li>
              )}
              {!clientAuth.loading && clientAuth.user && (
                <li className={"relative flex gap-3"}>
                  <Dropdown
                    role={clientAuth.user.role!}
                    avatar_url={clientAuth.user.avatar_url}
                  />
                </li>
              )}
              {!clientAuth.loading && !clientAuth.user && (
                <li>
                  <Link
                    href={"/login/"}
                    prefetch
                    className="whitespace-nowrap rounded-[2rem] bg-disabled-dark px-6 py-2 font-normal tracking-normal text-background-light-gray shadow-md"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};
