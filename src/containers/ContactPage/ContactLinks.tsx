import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import ContactLinkItem from "./ContactLinkItem";

const list = [
  { icon: Mail, href: "mailto:yungchinpang999@gmail.com", name: "Email" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/sam-yung-14ba7b1a4/",
    name: "LinkedIn"
  },
  {
    icon: Github,
    href: "https://github.com/samyung0",
    name: "Github"
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/async12/",
    name: "Instagram"
  },
];

export default function ContacLinks() {
  return (
    <section className="mx-auto mt-12 grid max-w-xl sm:mt-20 lg:mt-20 lg:max-w-2xl">
      <ul role="list" className="divide-y dark:divide-gray-700">
        {list.map((item) => {
          return (
            <ContactLinkItem key={item.href} href={item.href} name={item.name}>
              <item.icon className="md:size-[20px] size-[15px]"></item.icon>
            </ContactLinkItem>
          );
        })}
      </ul>
    </section>
  );
}
