import LandingPage from "~/containers/LandingPage";
import HeroContainer from "~/containers/LandingPage/HeroContainer";

const page = () => {
  return (
    <main id="main" className="relative max-h-[100dvh] overflow-hidden">
      <LandingPage HeroContainer={<HeroContainer />} />
    </main>
  );
};

export default page;

export const runtime = "edge";
