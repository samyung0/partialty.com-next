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
import { useContext } from "react";
import { Loader } from "~/components/Loader";
import { ThemeSwitch } from "~/components/ThemeSwitch";
import { clientAuthContext } from "~/context/ClientAuthContext";

export const PublicNav = () => {
  const clientAuth = useContext(clientAuthContext);

  return (
    <div className="shadow shadow-slate-200/80 ring-1 ring-slate-900/5">
      <nav className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-8 ">
        <div className="inline-flex w-[250px] items-center gap-2">
          <Image src={"/svg/partialty.svg"} width="15" height="15" alt="icon" />
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
              <span className="px-6">
                <Loader />
              </span>
            )}
            {!clientAuth.loading && clientAuth.user && (
              <li
                className={
                  "relative flex gap-3 px-6 py-2 [&:hover>div>span:last-child]:rotate-180 [&:hover>div]:flex"
                }
              >
                <div className={"flex gap-2"}>
                  <span className="relative">
                    <Image
                      src={clientAuth.user.avatar_url}
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="max-w-[unset] rounded-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                    {clientAuth.user.role !== "free" && (
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
                      "inline-flex size-[16px] items-center text-primary-dark-gray transition-transform dark:text-background-light-gray"
                    }
                  >
                    <ChevronDown />
                  </span>
                </div>
                <div className="absolute left-[0] top-[100%] z-[50] hidden w-[180px] -translate-x-[50%] pt-2 font-bold xl:left-[50%]">
                  <div
                    className={
                      "flex-1 rounded-xl border-2 border-primary-dark-gray bg-background-light-gray text-primary-dark-gray dark:border-disabled-dark dark:bg-highlight-dark dark:text-background-light-gray"
                    }
                  >
                    <ul className="flex flex-col p-1 lg:p-2 [&>li]:p-1 lg:[&>li]:p-2">
                      <li>
                        <Link
                          prefetch
                          href={"/members/dashboard/"}
                          className="flex items-center gap-3"
                        >
                          <span className="size-[20px]">
                            <Home />
                          </span>
                          <span className="whitespace-nowrap  ">Home</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          prefetch
                          href="/profile/"
                          className="flex items-center gap-3"
                        >
                          <span className="size-[20px]">
                            <User2 />
                          </span>
                          <span className="whitespace-nowrap">My Profile</span>
                        </Link>
                      </li>
                      {clientAuth.user.role !== "free" && (
                        <li>
                          <Link
                            prefetch
                            href="/creator/"
                            className="flex items-center gap-3"
                          >
                            <span className="size-[20px]">
                              <PencilLine />
                            </span>
                            <span className="whitespace-nowrap">Creator</span>
                          </Link>
                        </li>
                      )}
                      {clientAuth.user.role === "admin" && (
                        <li>
                          <Link
                            prefetch
                            href="/admin/courseapproval/"
                            className="flex items-center gap-3"
                          >
                            <span className="size-[20px]">
                              <Shield />
                            </span>
                            <span className="whitespace-nowrap">Admin</span>
                          </Link>
                        </li>
                      )}
                      <li>
                        <button
                          // onClick$={handleLogout}
                          className="flex items-center gap-3"
                        >
                          <span className="text-[20px]">
                            <LogOut />
                          </span>
                          <span>Logout</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
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
  );
};
