// import { useRef } from "react";
import { FollowerPointerCard } from "~/components/FollowingPointer";
import HeroText from "./HeroText";
import AnimateHeroText from "./AnimateHeroText";
import Phaser from "./Phaser";
import { Suspense } from "react";
export default function Hero() {
  return (
    <section className="relative h-[100dvh] w-full overflow-x-hidden">
      <div className="absolute left-[50%] top-[50%] z-[50] translate-x-[-50%] translate-y-[-50%]">
        <FollowerPointerCard className="relative h-full" title="Partialty.com">
          <div>
            <AnimateHeroText HeroText={<HeroText />} />
          </div>
        </FollowerPointerCard>
      </div>
      <div className="absolute inset-0 z-10">
        <Suspense fallback={<div className="bg-red-500">disadoisjaoidjasoidjai</div>}>
        <Phaser />

        </Suspense>
      </div>
    </section>
  );
}
