import Image from 'next/image';

const TechStackItem = ({ imgUrl, category, name }: { imgUrl: string; category: string; name: string }) => {
  return (
    <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg text-center shadow">
      <div className="flex flex-1 flex-col px-8 py-4 md:py-8">
        <Image
          className="mx-auto size-24 flex-shrink-0 object-contain md:size-28 lg:size-32"
          src={imgUrl}
          width={128}
          height={128}
          alt={name}
        />
        <h3 className="mt-6 text-sm font-medium">{category}</h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Name</dt>
          <dd className="text-sm text-gray-500 dark:text-gray-400">{name}</dd>
        </dl>
      </div>
    </li>
  );
};

export default function TechStack() {
  return (
    <section className="mx-auto mt-16 grid max-w-xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <TechStackItem imgUrl="/img/nextjs.png" category="UI Library & Meta-framework" name="React & Next JS" />
        <TechStackItem imgUrl="/img/tailwind.svg" category="CSS Library" name="Tailwind CSS & Shadcn" />
        <TechStackItem imgUrl="/img/turso.png" category="Database" name="Turso" />
        <TechStackItem imgUrl="/img/drizzle.png" category="Database ORM" name="Drizzle" />
        <TechStackItem imgUrl="/img/vercel.png" category="Hosting Platform" name="Vercel Edge" />
        <TechStackItem imgUrl="/img/mux.png" category="Audio Provider" name="Mux" />
        <TechStackItem imgUrl="/img/cloudinary.png" category="Image Provider" name="Cloudinary" />
      </ul>
    </section>
  );
}
