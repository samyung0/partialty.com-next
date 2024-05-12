import LandingPage from "~/containers/LandingPage";
import HeroContainer from "~/containers/LandingPage/HeroContainer";

export default function HomePage() {
  return (
    <main className="relative max-h-[100dvh] overflow-hidden">
      <LandingPage
        HeroContainer={<HeroContainer />}
      />
    </main>
  );
}
