'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import { type SpriteProps } from '../Hero';

import { motion } from 'framer-motion';

export default function BlastButton({ sprite }: { sprite: SpriteProps }) {
  const blast = useCallback(() => {
    sprite.largeSprite?.forEach((sprite) => {
      if (!sprite) return;
      sprite.setAngularVelocity(Math.min(0.35, Math.random()));
      sprite.setVelocity((Math.random() < 0.5 ? -1 : 1) * Math.random() * 50, Math.random() * 50);
    });
    sprite.mediumSprite?.forEach((sprite) => {
      if (!sprite) return;
      sprite.setAngularVelocity(Math.min(0.35, Math.random()));
      sprite.setVelocity((Math.random() < 0.5 ? -1 : 1) * Math.random() * 50, Math.random() * 50);
    });
    sprite.smallSprite?.forEach((sprite) => {
      if (!sprite) return;
      sprite.setAngularVelocity(Math.min(0.35, Math.random()));
      sprite.setVelocity((Math.random() < 0.5 ? -1 : 1) * Math.random() * 50, Math.random() * 50);
    });
  }, [sprite]);
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 2 } }}
      // transition={{ delay: 2 }}
      whileHover={{
        scale: 1.2,
        // transition: { duration: 1 },
      }}
      whileTap={{ scale: 0.9 }}
      onClick={blast}
      className="absolute left-8 top-[15%] z-[50] hidden flex-col items-center justify-center md:flex lg:bottom-[15%] lg:left-24 lg:top-[unset]"
    >
      <Image
        src={'/img/blast.png'}
        alt="Blast"
        width="40"
        height="40"
        className="size-[30px] object-contain lg:size-[40px]"
      />
      <span className="text-xs italic text-[#CC5DE8]">Blast</span>
    </motion.button>
  );
}
