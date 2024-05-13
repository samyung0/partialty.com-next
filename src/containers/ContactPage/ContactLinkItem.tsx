"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

const handleClick = (link: string) => {
  void navigator.clipboard.writeText(link);
  toast.success("Copied to Clipboard!");
};

export default function ContactLinkItem({
  href,
  children,
  name,
}: {
  href: string;
  children: React.ReactNode;
  name: string;
}) {
  return (
    <li className="flex justify-center gap-x-8 py-5">
      <a href={href} className="flex items-center justify-center gap-4">
        <span>{children}</span>
        <span className="md:text-base text-sm">{name}</span>
      </a>{" "}
      <button
        onClick={() => {
          handleClick(href);
        }}
      >
        <Copy className="md:size-[15px] size-[12px]" />
      </button>
    </li>
  );
}
