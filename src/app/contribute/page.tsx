import { Footer } from "~/components/Footer";
import { PublicNav } from "~/components/Nav/PublicNav";
import ContributePage from "~/containers/ContributePage";

const App = () => {
  return (
    <main>
      <PublicNav />
      <div className="py-24 sm:py-32">
        <ContributePage />
      </div>
      <Footer />
    </main>
  );
};

export default App;
