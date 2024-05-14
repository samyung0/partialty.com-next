import ContactLinks from './ContactLinks';

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <p className="mt-2 font-mosk text-2xl font-bold tracking-wide md:text-3xl">Contact Me</p>
        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 md:text-base lg:mt-6 lg:text-lg lg:leading-8">
          Here are my social links. Feel free to contact me about anything, but please don&apos;t spam my inbox D: If
          the community grows, I will remember to replace the links with the community ones.
        </p>
      </div>
      <ContactLinks />
    </section>
  );
}
