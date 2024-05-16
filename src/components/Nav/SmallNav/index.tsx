'use client';

import { AlignJustify } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SideNav } from './SideNav';

export const SmallNav = ({
  SideNavUserNav,
  SideNavUserIcon,
}: {
  SideNavUserIcon: React.ReactNode;
  SideNavUserNav: React.ReactNode;
}) => {
  const [showSideNav, setShowSideNav] = useState(false);
  return (
    <>
      {showSideNav && (
        <SideNav SideNavUserNav={SideNavUserNav} SideNavUserIcon={SideNavUserIcon} setShowSideNav={setShowSideNav} />
      )}
      <nav>
        <div className=" mx-auto flex max-w-7xl items-center justify-between px-4 py-6 text-[25px] sm:px-6">
          <div className="inline-flex w-[250px] items-center gap-2">
            <Image src={'/svg/partialty.svg'} width="15" height="15" alt="icon" />
            <h2 className="font-mosk text-lg tracking-wide">
              <Link prefetch href="/">
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
