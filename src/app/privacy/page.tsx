import { Footer } from '~/components/Footer';
import { PublicNav } from '~/components/Nav/PublicNav';
import PrivacyPage from '~/containers/PrivacyPage';

const Page = () => {
  return (
    <main>
      <PublicNav />
      <div className="py-24 sm:py-32">
        <PrivacyPage />
      </div>
      <Footer />
    </main>
  );
};

export default Page;
