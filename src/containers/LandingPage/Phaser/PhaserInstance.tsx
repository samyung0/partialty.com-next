'use client';

import { type Dispatch, type SetStateAction, useRef } from 'react';
import GameManager, { type IRefPhaserGame } from './GameManager';
import { type SpriteProps } from '../Hero';

export default function PhaserInstance({ setSprite }: { setSprite: Dispatch<SetStateAction<SpriteProps>> }) {
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  const currentScene = (scene: Phaser.Scene) => {
    // console.log(scene);
  };

  return <GameManager setSprite={setSprite} ref={phaserRef} currentActiveScene={currentScene} />;
}
