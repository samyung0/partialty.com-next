import { cn } from '~/lib/utils';
import { Terminal } from 'lucide-react';

import Image from 'next/image';

export default function HeroText() {
  return (
    <section
      className={cn('flex w-[90dvw] flex-col items-center  justify-center gap-6  lg:w-[600px] lg:max-w-[600px]')}
    >
      <div className="text-lg">
        <Terminal />
      </div>
      <h1 className="relative text-center font-mosk text-2xl tracking-wide md:text-3xl lg:text-4xl">
        <span className="absolute left-[0] top-[-20px] block -rotate-12 md:left-[-50px] md:top-[20px]">
          <Image
            src={'/img/sparkle-dark.png'}
            alt=""
            width="30"
            height="30"
            className="size-[20px] object-contain md:size-[30px]"
          />
        </span>
        Learn Front-end in a{' '}
        <span className="whitespace-nowrap">
          <span className="highlight-light-lilac dark:highlight-dark-lilac">painless</span> way
        </span>
        .
      </h1>
      <p className="text-bold relative text-center text-sm md:leading-5 md:tracking-wider lg:text-base lg:leading-6">
        We got audio courses with <span className="border-b-4 border-custom-yellow">beautiful</span> highlights.
        <br />
        <span className="hidden md:inline">
          No more digging around docs and opening twenty tabs just to learn the basics.
          <br />
        </span>
        Dive into our free courses and give us your opinions! <span className="whitespace-nowrap">(づ ◕‿◕ )づ</span>
        <span className="absolute bottom-[-30px]  right-[50px] block rotate-12 md:bottom-[0px] md:right-[-50px]">
          <Image
            src={'/img/fire-dark.png'}
            alt=""
            width="30"
            height="30"
            className="size-[20px]  object-contain md:size-[30px]"
          />
        </span>
      </p>
      <a
        href="/members/dashboard/"
        className="cursor-none rounded-[2rem] bg-primary-dark-gray px-5 py-2 text-sm text-background-light-gray shadow-xl dark:bg-highlight-dark lg:px-6 lg:py-3"
      >
        I&apos;m Locked in
      </a>
    </section>
  );
}
