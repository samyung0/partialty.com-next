'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme = 'dark' } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme as ToasterProps['theme']}
      className="toaster group whitespace-pre-line"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          success: 'bg-background-light-gray dark:bg-highlight-dark',
          warning: 'dark:bg-amber-500/80 bg-amber-200/50',
          error: 'dark:bg-tomato/80 bg-tomato/20',
          info: 'bg-background-light-gray dark:bg-highlight-dark',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
