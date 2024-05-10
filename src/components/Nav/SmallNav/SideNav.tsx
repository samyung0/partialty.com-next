"use client"
import {
  FileText,
  Home,
  X,
} from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, Suspense} from "react";
import { ThemeSwitch } from "~/components/ThemeSwitch";
// import { SideNavUserIcon, SideNavUserNav } from "./SideNavUser";
import { Loader } from "~/components/Loader";

export const SideNav = ({
  setShowSideNav,
  SideNavUserIcon,
  SideNavUserNav
}: {
  setShowSideNav: Dispatch<SetStateAction<boolean>>;
  SideNavUserIcon: React.ReactNode,
  SideNavUserNav: React.ReactNode
}) => {
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
            <Suspense fallback={<Loader />}>
              {SideNavUserIcon}
            </Suspense>
          </li>
          <li>
            <Link
              prefetch
              href={"/members/dashboard/"}
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
          <Suspense>
            {SideNavUserNav}
          </Suspense>
        </ul>
      </div>
    </nav>
  );
};