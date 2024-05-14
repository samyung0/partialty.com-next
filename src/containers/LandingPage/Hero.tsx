'use client';
// import { useRef } from "react";
import { FollowerPointerCard } from '~/components/FollowingPointer';
import HeroText from './HeroText';
import AnimateHeroText from './AnimateHeroText';
import Phaser from './Phaser';
import { useState } from 'react';
import BlastButton from './Phaser/BlastButton';

export interface SpriteProps {
  largeSprite: Phaser.Physics.Matter.Sprite[] | null;
  mediumSprite: Phaser.Physics.Matter.Sprite[] | null;
  smallSprite: Phaser.Physics.Matter.Sprite[] | null;
}

export default function Hero() {
  const [sprite, setSprite] = useState<SpriteProps>({
    largeSprite: null,
    mediumSprite: null,
    smallSprite: null,
  });
  return (
    <section className="relative h-[100dvh] w-full overflow-x-hidden">
      <BlastButton sprite={sprite} />
      <div className="absolute left-[50%] top-[50%] z-[50] translate-x-[-50%] translate-y-[-50%]">
        <FollowerPointerCard className="relative h-full" title="Partialty.com">
          <div>
            <AnimateHeroText HeroText={<HeroText />} />
          </div>
        </FollowerPointerCard>
      </div>
      <div className="absolute inset-0 z-10">
        <Phaser setSprite={setSprite} />
      </div>
    </section>
  );
}
