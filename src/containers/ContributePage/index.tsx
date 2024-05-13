import TechStack from "./TechStack";

export default function ContributePage() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <p className="mt-2 font-mosk text-2xl font-bold tracking-wide md:text-3xl">
          Contribute
        </p>
        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 md:text-base lg:mt-6 lg:text-lg lg:leading-8">
          We recently migrated from Qwik to Next JS and this is the repo for
          Next JS. If you want to make contributions to the code base, feel free
          to email me and I will walk you through the repo. If you want to
          create courses, we are currently working a text editor and you will be
          able to create your own courses very soon!
          <br />
          <a
            href="https://github.com/samyung0/partialty.com-next"
            target="_blank"
            className="underline underline-offset-2"
          >
            Link to Repo
          </a>
        </p>
      </div>
      <TechStack />
    </section>
  );
}
