"use client";

import { LogOut } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { logout } from "~/server/profiles";

export const LogoutButtonSideNav = () => {
  const form = useForm();
  const handleLogout = async () => {
    const result = await logout();
    if (!result.success) {
      toast.error("Unable to logout! Try refreshing the page.");
      return;
    }
  };
  return (
    <form onSubmit={form.handleSubmit(handleLogout)}>
      <button type="submit" className="flex items-center gap-3">
        <span>Logout</span>
        <span>
          <LogOut className="size-[20px]" />
        </span>
      </button>
    </form>
  );
};
