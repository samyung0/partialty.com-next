import { Footer } from "~/components/Footer"
import { PublicNav } from "~/components/Nav/PublicNav"
import ContactPage from "~/containers/ContactPage"

const page = () => {
  return (
    <main>
      <PublicNav />
      <div className="py-24 sm:py-32">
        <ContactPage />
      </div>
      <Footer />
    </main>
  )
}

export default page;