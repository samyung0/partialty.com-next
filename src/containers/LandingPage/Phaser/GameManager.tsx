"use client";

import Phaser from "phaser";
import { forwardRef, useRef, useLayoutEffect, useEffect } from "react";
import { useDebouncedCallback } from 'use-debounce';

import { Events } from "phaser";

// Used to emit events between React components and Phaser scenes
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Events.EventEmitter
export const EventBus = new Events.EventEmitter();

import { AUTO, Game } from "phaser";
import { Boot } from "./Scenes/Boot";

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  physics: {
    default: "matter",
    matter: {
      // debug: true,
    },
  },
  transparent: true,
  parent: "game-container",
  scene: [Boot],
};

const StartGame = (parent: HTMLElement, w: number, h: number) => {
  return new Game({ ...config, parent, width: w, height: h });
};

export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

interface IProps {
  currentActiveScene?: (scene_instance: Phaser.Scene) => void;
}

export default forwardRef<IRefPhaserGame, IProps>(function PhaserGame(
  { currentActiveScene },
  ref,
) {
  const game = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const debounce = useDebouncedCallback(() => {
    if (!containerRef.current || !game.current) return;
    console.log("resize");
    game.current.scale.resize(
      containerRef.current.offsetWidth,
      containerRef.current.offsetHeight,
    );
    game.current.scene.scenes[0]?.matter.world.setBounds(
      0,
      0,
      containerRef.current.offsetWidth,
      containerRef.current.offsetHeight,
    );
    game.current.canvas.setAttribute(
      "style",
      `display: block; width: ${containerRef.current.offsetWidth} px; height: ${containerRef.current.offsetHeight}px;`,
    );
  }, 500);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    if (game.current === null) {
      game.current = StartGame(
        containerRef.current,
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight,
      );

      if (typeof ref === "function") {
        ref({ game: game.current, scene: null });
      } else if (ref) {
        ref.current = { game: game.current, scene: null };
      }
    }

    return () => {
      if (game.current) {
        game.current.destroy(true);
        if (game.current !== null) {
          game.current = null;
        }
      }
    };
  }, [ref, containerRef]);

  useEffect(() => {
    EventBus.on("current-scene-ready", (scene_instance: Phaser.Scene) => {
      if (currentActiveScene && typeof currentActiveScene === "function") {
        currentActiveScene(scene_instance);
      }

      if (typeof ref === "function") {
        ref({ game: game.current, scene: scene_instance });
      } else if (ref) {
        ref.current = { game: game.current, scene: scene_instance };
      }
    });
    return () => {
      EventBus.removeListener("current-scene-ready");
    };
  }, [currentActiveScene, ref]);

  useEffect(() => {
    window.addEventListener("resize", debounce);
    return () => {
      window.removeEventListener("resize", debounce);
    }
  }, [debounce]);

  return <div ref={containerRef} className="h-full w-full"></div>;
});
