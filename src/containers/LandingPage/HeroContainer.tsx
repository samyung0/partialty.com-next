import { PublicNav } from "~/components/Nav/PublicNav";
import Hero from "./Hero";

export default function HeroContainer() {
  return (
    <div className="h-[100dvh] max-h-[100dvh] overflow-hidden">
      <div className="absolute top-0 z-[999] w-full">
        <PublicNav />
      </div>
      <Hero />
    </div>
  );
}
