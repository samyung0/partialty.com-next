import Hero from "~/containers/LandingPage/Hero";

export default function HomePage() {
  return (
    <main className="relative max-h-[100dvh] min-h-[100dvh] overflow-hidden bg-background-light-gray text-primary-dark-gray dark:bg-primary-dark-gray dark:text-background-light-gray">
      <Hero />
    </main>
  );
}
