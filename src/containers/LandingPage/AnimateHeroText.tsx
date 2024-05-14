'use client';

import { motion } from 'framer-motion';

const spring = {
  type: 'spring',
  damping: 10,
  stiffness: 100,
};

export default function AnimateHeroText({ HeroText }: { HeroText: React.ReactNode }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={spring}
    >
      {HeroText}
    </motion.div>
  );
}
