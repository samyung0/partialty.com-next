import ContactLinks from "./ContactLinks";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <p className="mt-2 font-mosk md:text-3xl font-bold tracking-wide text-2xl">
          Contact Me
        </p>
        <p className="lg:mt-6 mt-3 lg:text-lg md:text-base text-sm lg:leading-8 leading-6 text-gray-600 dark:text-gray-300">
          Here are my social links. Feel free to contact me about anything, but
          please don&apos;t spam my inbox D: If the community grows, I will
          remember to replace the links with the community ones.
        </p>
      </div>
      <ContactLinks />
    </section>
  );
}
