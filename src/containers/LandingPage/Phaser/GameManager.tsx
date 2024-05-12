"use client";

import type Phaser from "phaser";
import {
  forwardRef,
  useRef,
  useEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { SpriteProps } from "../Hero";

export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

interface IProps {
  currentActiveScene?: (scene_instance: Phaser.Scene) => void;
  setSprite: Dispatch<SetStateAction<SpriteProps>>;
}

export default forwardRef<IRefPhaserGame, IProps>(function PhaserGame(
  { currentActiveScene, setSprite },
  ref,
) {
  const [game, setGame] = useState<Phaser.Game | null>(null);
  const [loadedScript, setLoadedScript] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<Phaser.Events.EventEmitter>();

  const resize = useCallback(() => {
    if (!containerRef.current || !game) return;
    console.log("resize");
    game.scale.resize(
      containerRef.current.offsetWidth,
      containerRef.current.offsetHeight,
    );
    game.scene.scenes[0]?.matter.world.setBounds(
      0,
      0,
      containerRef.current.offsetWidth,
      containerRef.current.offsetHeight,
    );
    game.canvas.setAttribute(
      "style",
      `display: block; width: ${containerRef.current.offsetWidth} px; height: ${containerRef.current.offsetHeight}px;`,
    );
  }, [game]);

  const debounce = useDebouncedCallback(resize, 500);

  const init = useCallback(() => {
    if ((window as any).newGame || !!events) return;
    console.log("init phaser");
    setEvents(new window.Phaser.Events.EventEmitter());

    const randomize = (max: number) => {
      return Math.floor(Math.random() * max);
    };

    class Boot extends window.Phaser.Scene {
      largeSprite: Phaser.Physics.Matter.Sprite[] = [];
      mediumSprite: Phaser.Physics.Matter.Sprite[] = [];
      smallSprite: Phaser.Physics.Matter.Sprite[] = [];
      gameObject: any;
      dragX: any;
      dragY: any;
      constructor() {
        super("Boot");
      }

      preload() {
        console.log("Width: ", this.game.canvas.width);
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.atlas(
          "sheet",
          "/2d_assets/sprite.png",
          "/2d_assets/sprite.json",
        );

        // Load body shapes from JSON file generated using PhysicsEditor
        this.load.json("shapes", "/2d_assets/all.json");
      }

      create() {
        const shapes = this.cache.json.get("shapes");
        this.matter.world.setBounds(
          0,
          0,
          this.game.canvas.width,
          this.game.canvas.height,
        );
        this.largeSprite.push(
          this.matter.add
            .sprite(
              randomize(this.game.canvas.width),
              0,
              "sheet",
              "small_css.png",
              {
                shape: shapes.small_css,
              },
            )
            .setInteractive(),
        );
        this.largeSprite.push(
          this.matter.add
            .sprite(
              randomize(this.game.canvas.width),
              0,
              "sheet",
              "small_js.png",
              {
                shape: shapes.small_js,
              },
            )
            .setInteractive(),
        );
        this.largeSprite.push(
          this.matter.add
            .sprite(
              randomize(this.game.canvas.width),
              0,
              "sheet",
              "small_html.png",
              {
                shape: shapes.small_html,
              },
            )
            .setInteractive(),
        );
        this.largeSprite.push(
          this.matter.add
            .sprite(
              randomize(this.game.canvas.width),
              0,
              "sheet",
              "batch_react.png",
              {
                shape: shapes.batch_react,
              },
            )
            .setInteractive(),
        );
        this.largeSprite.push(
          this.matter.add
            .sprite(
              randomize(this.game.canvas.width),
              0,
              "sheet",
              "batch_nextjs.png",
              {
                shape: shapes.batch_nextjs,
              },
            )
            .setInteractive(),
        );
        this.largeSprite.push(
          this.matter.add
            .sprite(
              randomize(this.game.canvas.width),
              0,
              "sheet",
              "batch_qwik.png",
              {
                shape: shapes.batch_qwik,
              },
            )
            .setInteractive(),
        );
        this.mediumSprite.push(
          this.matter.add
            .sprite(
              randomize(this.game.canvas.width),
              0,
              "sheet",
              "batch_sublime.png",
              {
                shape: shapes.batch_sublime,
              },
            )
            .setInteractive(),
        );
        this.mediumSprite.push(
          this.matter.add
            .sprite(
              randomize(this.game.canvas.width),
              0,
              "sheet",
              "batch_vscode.png",
              {
                shape: shapes.batch_vscode,
              },
            )
            .setInteractive(),
        );
        this.mediumSprite.push(
          this.matter.add
            .sprite(
              randomize(this.game.canvas.width),
              0,
              "sheet",
              "batch_intellij.png",
              {
                shape: shapes.batch_intellij,
              },
            )
            .setInteractive(),
        );
        this.mediumSprite.push(
          this.matter.add
            .sprite(
              randomize(this.game.canvas.width),
              0,
              "sheet",
              "batch_neovim.png",
              {
                shape: shapes.batch_neovim,
              },
            )
            .setInteractive(),
        );
        for (let i = 0; i < 10; i++) {
          this.smallSprite.push(
            this.matter.add
              .sprite(
                randomize(this.game.canvas.width),
                0,
                "sheet",
                "batch_gray_circle.png",
                {
                  shape: shapes.batch_gray_circle,
                },
              )
              .setInteractive(),
          );
          this.smallSprite.push(
            this.matter.add
              .sprite(
                randomize(this.game.canvas.width),
                0,
                "sheet",
                "gray_square.png",
                {
                  shape: shapes.gray_square,
                },
              )
              .setInteractive(),
          );
        }
        setSprite({
          largeSprite: this.largeSprite,
          mediumSprite: this.mediumSprite,
          smallSprite: this.smallSprite
        })
        this.largeSprite.forEach((sprite) => {
          if (!sprite) return;
          this.input.setDraggable(sprite, true);
          sprite.displayWidth = 80;
          sprite.displayHeight = 80;
          sprite.setAngularVelocity(Math.min(0.35, Math.random()));
          sprite.setVelocity(
            (Math.random() < 0.5 ? -1 : 1) * Math.random() * 20,
            Math.random() * 10,
          );
        });
        this.mediumSprite.forEach((sprite) => {
          if (!sprite) return;
          this.input.setDraggable(sprite, true);
          sprite.displayWidth = 50;
          sprite.displayHeight = 50;
          sprite.setAngularVelocity(Math.min(0.35, Math.random()));
          sprite.setVelocity(
            (Math.random() < 0.5 ? -1 : 1) * Math.random() * 20,
            Math.random() * 10,
          );
        });
        this.smallSprite.forEach((sprite) => {
          if (!sprite) return;
          this.input.setDraggable(sprite, true);
          sprite.displayWidth = 15;
          sprite.displayHeight = 15;
          sprite.setAngularVelocity(Math.min(0.35, Math.random()));
          sprite.setVelocity(
            (Math.random() < 0.5 ? -1 : 1) * Math.random() * 20,
            Math.random() * 10,
          );
        });
        this.input.on(
          "drag",
          (pointer: any, gameObject: any, dragX: any, dragY: any) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
            this.gameObject = gameObject;
            this.dragX = dragX;
            this.dragY = dragY;
            setPhysicsOn(gameObject, false);
          },
        );
        this.input.on("dragstart", (pointer: any, gameObject: any) => {
          setPhysicsOn(gameObject, false);
        });
        this.input.on("dragend", (pointer: any, gameObject: any) => {
          this.gameObject = null;
          setPhysicsOn(gameObject, true);
        });
        function setPhysicsOn(sprite: any, val = true) {
          sprite.body.enable = val;
          // sprite.setCollisionCategory(val ? 1 : null);
          sprite.setIgnoreGravity(!val);
          if (!val) {
            sprite.setAngularVelocity(0);
            sprite.setVelocity(0, 0);
          }
        }

        events?.emit("current-scene-ready", this);
      }

      update() {
        // const loop = this.sys.game.loop;
        if (this.gameObject) {
          this.gameObject.x = this.dragX;
          this.gameObject.y = this.dragY;
        }
        // console.log(loop.actualFps);
      }
    }

    (window as any).newGame = new window.Phaser.Game({
      type: window.Phaser.AUTO,
      physics: {
        default: "matter",
        matter: {
          // debug: true,
        },
      },
      transparent: true,
      scene: [Boot],
      parent: containerRef.current!,
      width: containerRef.current!.offsetWidth,
      height: containerRef.current!.offsetHeight,
    });

    setGame((window as any).newGame);

    if (typeof ref === "function") {
      ref({ game: (window as any).newGame, scene: null });
    } else if (ref) {
      ref.current = { game: (window as any).newGame, scene: null };
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (window as any).newGame;
  }, [events, ref]);

  useEffect(() => {
    if (loadedScript) return;
    setLoadedScript(true);
    console.log("load phaser");
    const script = document.createElement("script");
    script.src = "/script/phaser.min.js";
    let newGame: Phaser.Game | null = null;
    script.onload = () => {
      newGame = init() ?? null;
    };
    document.body.append(script);

    return () => {
      newGame?.destroy(true);
      setGame(null);
    };
  }, [init, loadedScript]);

  useEffect(() => {
    if (!game) return;
    events?.on("current-scene-ready", (scene_instance: Phaser.Scene) => {
      if (currentActiveScene && typeof currentActiveScene === "function") {
        currentActiveScene(scene_instance);
      }

      if (typeof ref === "function") {
        ref({ game, scene: scene_instance });
      } else if (ref) {
        ref.current = { game, scene: scene_instance };
      }
    });
    return () => {
      events?.removeListener("current-scene-ready");
    };
  }, [currentActiveScene, ref, events, game]);

  useEffect(() => {
    window.addEventListener("resize", debounce);
    return () => {
      window.removeEventListener("resize", debounce);
    };
  }, [debounce]);

  return <div ref={containerRef} className="h-full w-full"></div>;
});
