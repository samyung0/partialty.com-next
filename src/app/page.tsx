import { PublicNav } from "~/components/Nav/PublicNav";
import Hero from "~/containers/LandingPage/Hero";

export default function HomePage() {
  return (
    <main className="relative max-h-[100dvh] min-h-[100dvh] overflow-hidden">
      <div className="absolute top-0 z-[999] w-full">
        <PublicNav />
      </div>
      <Hero />
    </main>
  );
}
