import LandingPage from "~/containers/LandingPage";
import HeroContainer from "~/containers/LandingPage/HeroContainer";
import SecondHalfContainer from "~/containers/LandingPage/SecondHalfContainer";

export default function HomePage() {
  return (
    <main className="relative max-h-[100dvh] overflow-hidden">
      <LandingPage
        HeroContainer={<HeroContainer />}
        SecondHalfContainer={<SecondHalfContainer />}
      />
    </main>
  );
}
