"use client";

import { useEffect, useRef } from "react";
import GameManager, { IRefPhaserGame } from "./GameManager";

export default function PhaserInstance() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  const currentScene = (scene: Phaser.Scene) => {
    // console.log(scene);
  };

  return <GameManager ref={phaserRef} currentActiveScene={currentScene} />;
}
