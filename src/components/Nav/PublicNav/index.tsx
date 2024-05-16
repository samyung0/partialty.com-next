import Image from 'next/image';
import Link from 'next/link';
import { ThemeSwitch } from '~/components/ThemeSwitch';
import { SmallNav } from '../SmallNav';
import { Suspense } from 'react';
import { UserNav } from '../UserNav';
import { Loader } from '~/components/Loader';
import { SideNavUserIcon, SideNavUserNav } from '../SmallNav/SideNavUser';

const LoadingElement = () => {
  return (
    <li className="px-6">
      <Loader />
    </li>
  );
};

export const PublicNav = () => {
  return (
    <>
      <div className="block lg:hidden">
        <SmallNav SideNavUserNav={<SideNavUserNav />} SideNavUserIcon={<SideNavUserIcon />} />
      </div>
      <div className="hidden shadow shadow-slate-200/80 ring-1 ring-slate-900/5 dark:shadow-slate-600/80 lg:block">
        <nav className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-8 ">
          <div className="inline-flex w-[250px] items-center gap-2">
            <Image src={'/svg/partialty.svg'} width="15" height="15" alt="icon" />
            <h2 className="font-mosk text-lg tracking-wide">
              <a href="/">
                Partialty.com
              </a>
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
              <Suspense fallback={<LoadingElement />}>
                <UserNav />
              </Suspense>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};
