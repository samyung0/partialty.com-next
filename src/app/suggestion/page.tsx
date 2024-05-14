import { Footer } from '~/components/Footer';
import { PublicNav } from '~/components/Nav/PublicNav';
import SuggestionPage from '~/containers/SuggestionPage';

const Page = () => {
  return (
    <main>
      <PublicNav />
      <div className="py-24 sm:py-32">
        <SuggestionPage />
      </div>
      <Footer />
    </main>
  );
};

export default Page;
