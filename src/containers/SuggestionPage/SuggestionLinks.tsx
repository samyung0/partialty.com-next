import Image from 'next/image';

const Item = ({ href, imageUrl, name }: { href: string; imageUrl: string; name: string }) => {
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <a target="_blank" href={href} className="flex w-full items-center justify-center gap-4">
        <Image
          src={imageUrl}
          alt="GoogleMail"
          width="30"
          height="30"
          className="size-[20px] object-contain md:size-[30px]"
        />
        <span className="text-sm md:text-base">{name}</span>
      </a>
    </li>
  );
};

export default function SuggestionLinks() {
  return (
    <section className="mx-auto mt-12 grid max-w-xl sm:mt-20 lg:mt-20 lg:max-w-2xl">
      <ul role="list" className="divide-y dark:divide-gray-700">
        <Item href="mailto:yungchinpang999@gmail.com" imageUrl="/img/google_mail.png" name="Mail" />
        <Item
          href="https://docs.google.com/forms/d/e/1FAIpQLSc06Zk8cVjiTGBmDd8Aj0mWlnbmx21nQUx3gvJK3bkb87QpOg/viewform?usp=sf_link"
          imageUrl="/img/google_form.png"
          name="Google Form"
        />
      </ul>
    </section>
  );
}
