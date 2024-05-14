'use client';

import { Copy } from 'lucide-react';
import { toast } from 'sonner';

const handleClick = (link: string) => {
  void navigator.clipboard.writeText(link);
  toast.success('Copied to Clipboard!');
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
        <span className="text-sm md:text-base">{name}</span>
      </a>{' '}
      <button
        onClick={() => {
          handleClick(href);
        }}
      >
        <Copy className="size-[12px] md:size-[15px]" />
      </button>
    </li>
  );
}
