'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { logout } from '~/server/profiles';

export const LogoutButtonUserNav = () => {
  const form = useForm();
  const router = useRouter();
  const handleLogout = async () => {
    const result = await logout();
    if (!result.success) {
      toast.error('Unable to logout! Try refreshing the page.');
      return;
    }
    router.refresh();
  };
  return (
    <form onSubmit={form.handleSubmit(handleLogout)}>
      <button type="submit" className="flex items-center gap-3 p-2">
        <span>
          <LogOut className="size-[20px]" />
        </span>
        <span>Logout</span>
      </button>
    </form>
  );
};
