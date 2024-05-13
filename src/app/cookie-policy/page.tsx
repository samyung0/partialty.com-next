import { Footer } from "~/components/Footer";
import { PublicNav } from "~/components/Nav/PublicNav";
import CookiePolicyPage from "~/containers/CookiePolicyPage";

const App = () => {
  return (
    <main>
      <PublicNav />
      <div className="py-24 sm:py-32">
        <CookiePolicyPage />
      </div>
      <Footer />
    </main>
  );
};

export default App;
