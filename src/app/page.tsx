import { Footer } from "~/components/Footer";
import { PublicNav } from "~/components/Nav/PublicNav";
import Hero from "~/containers/LandingPage/Hero";

export default function HomePage() {
  return (
    <main className="relative min-h-[100dvh] overflow-hidden">
      <div className="h-[100dvh] max-h-[100dvh] overflow-hidden">
        <div className="absolute top-0 z-[999] w-full">
          <PublicNav />
        </div>
        <Hero />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
