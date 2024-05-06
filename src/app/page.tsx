import { PublicNav } from "~/components/Nav/PublicNav";
import Hero from "~/containers/LandingPage/Hero";

export default function HomePage() {
  return (
    <main className="relative max-h-[100dvh] min-h-[100dvh] overflow-hidden text-primary-dark-gray  dark:text-background-light-gray">
      <div className="absolute top-0 z-10 w-full">
        <PublicNav />
      </div>
      <Hero />
    </main>
  );
}
