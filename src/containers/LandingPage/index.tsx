// import { useRef } from "react";
import { FollowerPointerCard } from "~/components/FollowingPointer";
import HeroText from "./HeroText";
import AnimateHeroText from "./AnimateHeroText";

export default function Hero() {
  // const parentEl = useRef<HTMLDivElement>(null);

  return (
    <section className="relative h-[100dvh] w-full overflow-x-hidden">
      <div className="absolute left-[50%] top-[50%] z-[50] translate-x-[-50%] translate-y-[-50%]">
        <FollowerPointerCard className="relative h-full" title="Partialty.com">
          <div>
            <AnimateHeroText HeroText={<HeroText />} />
          </div>
        </FollowerPointerCard>
      </div>
      {/* <div
        // ref={parentEl}
        className="absolute top-0 z-10 hidden h-full w-full bg-red-500 bg-transparent md:block "
      ></div> */}
    </section>
  );
}
