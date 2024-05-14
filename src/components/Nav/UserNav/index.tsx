import { ChevronDown, Home, PencilLine, Shield, User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type roles from '~/const/roles';
import { cn } from '~/lib/utils';
import { getUser } from '~/auth/getUser';
import { LogoutButtonUserNav } from './LogoutButtonUserNav';

export function Dropdown({ role, avatar_url }: { role: (typeof roles)[number]; avatar_url: string }) {
  return (
    <div className=" px-4 py-2 [&:hover>div>span:last-child]:rotate-180 [&:hover>div]:flex">
      <div className={'flex gap-2'}>
        <span className="relative">
          <Image
            src={avatar_url}
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full object-contain"
            referrerPolicy="no-referrer"
          />
          {role !== 'free' && (
            <Image
              src={'/img/crown.png'}
              width={20}
              height={20}
              alt="Crown"
              className="absolute right-[-15px] top-[-15px] max-w-[unset]"
            />
          )}
        </span>

        <span
          className={
            'inline-flex items-center text-primary-dark-gray transition-transform dark:text-background-light-gray'
          }
        >
          <ChevronDown className="size-[16px]" />
        </span>
      </div>
      <div className="absolute left-[0] top-[100%] z-[50] hidden w-[180px] -translate-x-[50%] pt-2 font-bold xl:left-[50%]">
        <div
          className={
            'flex-1 rounded-xl border-2 border-primary-dark-gray bg-background-light-gray text-primary-dark-gray dark:border-disabled-dark dark:bg-highlight-dark dark:text-background-light-gray'
          }
        >
          <ul className="flex flex-col p-2">
            <ListItem title="Home" href="/members/dashboard">
              <Home className="size-[20px]" />
            </ListItem>
            <ListItem title="Profile" href="/members/profile">
              <User2 className="size-[20px]" />
            </ListItem>
            {role !== 'free' && (
              <ListItem title="Creator" href="https://qwik.partialty.com/creator">
                <PencilLine className="size-[20px]" />
              </ListItem>
            )}
            {role === 'admin' && (
              <ListItem title="Admin" href="https://qwik.partialty.com/admin/">
                <Shield className="size-[20px]" />
              </ListItem>
            )}
            <li>
              <LogoutButtonUserNav />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const ListItem = ({ className, title, children, ...props }: React.ComponentPropsWithoutRef<'a'>) => {
  return (
    <li className="p-2">
      <Link prefetch href={props.href ?? ''} className={cn('flex items-center gap-3', className)}>
        <span>{children}</span>
        <span className="whitespace-nowrap">{title}</span>
      </Link>
    </li>
  );
};

export const UserNav = async () => {
  const user = await getUser();
  return (
    <>
      {user && (
        <li className={'relative flex gap-3'}>
          <Dropdown role={user.role!} avatar_url={user.avatar_url} />
        </li>
      )}
      {!user && (
        <li>
          <Link
            href={'/login/'}
            prefetch
            className="whitespace-nowrap rounded-[2rem] bg-disabled-dark px-6 py-2 font-normal tracking-normal text-background-light-gray shadow-md"
          >
            Login
          </Link>
        </li>
      )}
    </>
  );
};
