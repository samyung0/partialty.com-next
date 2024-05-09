"use client";

import {
  AlignJustify,
  FileText,
  Home,
  LogOut,
  PencilLine,
  Shield,
  User2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Separator } from "~/components/Divider";
import { Loader } from "~/components/Loader";
import { ThemeSwitch } from "~/components/ThemeSwitch";
import { clientAuthContext } from "~/context/ClientAuthContext";
import { logout } from "~/server/profiles";

const SideNav = ({
  setShowSideNav,
}: {
  setShowSideNav: Dispatch<SetStateAction<boolean>>;
}) => {
  const clientAuth = useContext(clientAuthContext);
  return (
    <nav
      className="fixed left-0 top-0 z-[9999] flex h-[100vh] w-[100vw] backdrop-blur-md"
      onClick={() => {
        setShowSideNav(false);
      }}
    >
      <button
        onClick={() => {
          setShowSideNav(false);
        }}
        className={"absolute right-5 top-5"}
      >
        <X className="size-[20px]" />
      </button>
      <div
        className={
          "w-[80%] overflow-auto  shadow shadow-slate-200/80 ring-1 ring-slate-900/5  dark:shadow-slate-600/80"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="mx-auto flex w-[90%] flex-col gap-6 py-6">
          <li className="flex items-center gap-6">
            <ThemeSwitch />
            {clientAuth.loading && (
              <span>
                <Loader />
              </span>
            )}
            {!clientAuth.loading && clientAuth.user && (
              <div
                className={
                  " ml-auto flex -translate-x-[8px] gap-2 sm:translate-x-0"
                }
              >
                <span className="relative">
                  <Image
                    src={clientAuth.user.avatar_url}
                    alt="Avatar"
                    width={35}
                    height={35}
                    className="rounded-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                  {clientAuth.user.role !== "free" && (
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
            {!clientAuth.loading && !clientAuth.user && (
              <span>
                <Link prefetch href={"/login"} className="whitespace-nowrap">
                  Login | Signup
                </Link>
              </span>
            )}
          </li>
          <li>
            <Link
              prefetch
              href={clientAuth.user ? "/members/dashboard/" : "/login/"}
              className="flex items-center gap-4"
            >
              Home
              <span>
                <Home className="size-[20px]" />
              </span>
            </Link>
          </li>
          <li>
            <Link
              prefetch
              href={"/catalog/"}
              className="flex items-center gap-4"
            >
              Courses
              <span>
                <FileText className="size-[20px]" />
              </span>
            </Link>
          </li>
          {!clientAuth.loading && clientAuth.user && (
            <>
              <Separator />
              <li>
                <Link
                  prefetch
                  href="/profile/"
                  className="flex items-center gap-4"
                >
                  <span className="whitespace-nowrap">My Profile</span>
                  <span>
                    <User2 className="size-[20px]" />
                  </span>
                </Link>
              </li>
              {clientAuth.user.role !== "free" && (
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
              {clientAuth.user.role === "admin" && (
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
                <LogoutButton />
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

const LogoutButton = () => {
  return (
    <form action={logout}>
      <button type="submit" className="flex items-center gap-3">
        <span>Logout</span>
        <span>
          <LogOut className="size-[20px]" />
        </span>
      </button>
    </form>
  );
};

export const SmallNav = () => {
  const [showSideNav, setShowSideNav] = useState(false);
  return (
    <>
      {showSideNav && <SideNav setShowSideNav={setShowSideNav} />}
      <nav>
        <div className=" mx-auto flex max-w-7xl items-center justify-between px-4 py-6 text-[25px] sm:px-6">
          <div className="inline-flex w-[250px] items-center gap-2">
            <Image
              src={"/svg/partialty.svg"}
              width="15"
              height="15"
              alt="icon"
            />
            <h2 className="font-mosk text-lg tracking-wide">
              <Link href="/" prefetch>
                Partialty.com
              </Link>
            </h2>
          </div>
          <button
            className="p-2"
            onClick={() => {
              setShowSideNav(true);
            }}
          >
            <AlignJustify />
          </button>
        </div>
      </nav>
    </>
  );
};
