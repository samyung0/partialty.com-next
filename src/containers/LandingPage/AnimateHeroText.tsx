'use client';

import { motion, useAnimate } from 'framer-motion';
import { useEffect } from 'react';

export default function AnimateHeroText({ HeroText }: { HeroText: React.ReactNode }) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    void animate(
      scope.current,
      {
        opacity: 1,
        y: '10px',
      },
      {
        type: 'spring',
        damping: 10,
        stiffness: 100,
      }
    );
  }, [animate, scope]);

  return (
    <div
      ref={scope}
      className="opacity-0"
      // initial={{
      //   opacity: 0,
      //   y: 20,
      // }}
      // animate={{
      //   opacity: 1,
      //   y: 0,
      // }}
      // transition={spring}
    >
      {HeroText}
    </div>
  );
}
