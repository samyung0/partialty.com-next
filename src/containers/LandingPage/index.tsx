"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import SecondHalfContainer from "./SecondHalfContainer";

interface LandingPageProps {
  HeroContainer: React.ReactNode;
}

export default function LandingPage({ HeroContainer }: LandingPageProps) {
  const [scope, animate] = useAnimate();
  const animation = useCallback(
    (translateY: string) => {
      void animate(
        scope.current,
        { translateY: translateY },
        {
          duration: 0.5,
          type: "spring",
        },
      );
    },
    [animate, scope],
  );

  const [initialX, setInitialX] = useState<number | null>(null);
  const [initialY, setInitialY] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const secondHalfOfPage = useRef<HTMLDivElement>(null);

  const startTouch = useCallback((e: React.TouchEvent) => {
    if (!e.touches[0]) return;
    setInitialX(e.touches[0].clientX);
    setInitialY(e.touches[0].clientY);

    setTimeout(() => {
      setInitialX(null);
      setInitialY(null);
    }, 250);
  }, []);

  const logic = useCallback(
    (deltaY: number) => {
      if (page === 0 && deltaY > 0) {
        setPage(1);
      } else if (
        page === 1 &&
        secondHalfOfPage.current?.scrollTop === 0 &&
        deltaY < 0
      ) {
        setPage(0);
      }
    },
    [page],
  );

  const moveTouch = useCallback(
    (e: React.TouchEvent) => {
      if (initialX === null) {
        return;
      }

      if (initialY === null) {
        return;
      }

      if (!e.touches[0]) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;

      const diffX = initialX - currentX;
      const diffY = initialY - currentY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        // sliding horizontally
        if (diffX > 50) {
          // swiped left
          console.log("swiped left");
        } else {
          // swiped right
          console.log("swiped right");
        }
      } else {
        // sliding vertically
        if (diffY > 10 || diffY < -10) {
          logic(diffY);
        }
      }

      setInitialX(null);
      setInitialY(null);

      e.preventDefault();
    },
    [initialX, initialY, logic],
  );

  useEffect(() => {
    animation(page === 1 ? "-100dvh" : "0dvh");
  }, [animation, page]);

  return (
    <div
      ref={scope}
      className="relative min-h-[100dvh]"
      onWheel={(e) => {
        logic(e.deltaY);
      }}
      onTouchStart={startTouch}
      onTouchMove={moveTouch}
    >
      {HeroContainer}
      <div ref={secondHalfOfPage} className="max-h-[100dvh] overflow-auto">
        <SecondHalfContainer setPage={() => setPage(0)} />
      </div>
    </div>
  );
}
