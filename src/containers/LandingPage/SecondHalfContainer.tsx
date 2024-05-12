import { Footer } from "~/components/Footer";
import FAQPage from "../FAQPage";
import { forwardRef } from "react";
import Image from "next/image";

const CreatorMessage = () => {
  return (
    <section className="flex flex-wrap items-center justify-center px-8 pb-16 text-xs tracking-wide md:text-base">
      Made with ❤️ by Sam
      <Image
        src="https://lh3.googleusercontent.com/a/ACg8ocIP86qPV9CbWx6OZ_6GL8sFNtxfz-REeUd99YRvtm9LxH4etYAiHQ=s576-c-no"
        referrerPolicy="no-referrer"
        width="40"
        height="40"
        alt=""
        className="mx-2 block size-[30px] rounded-full object-contain md:mx-4 md:size-[40px]"
      />{" "}
      from Hong Kong
    </section>
  );
};

export default forwardRef<HTMLDivElement, { setPage: () => any }>(
  function SecondHalfContainer({ setPage }, ref) {
    return (
      <>
        <FAQPage buttonAction={setPage} topButton={true} />
        <CreatorMessage />
        <Footer />
      </>
    );
  },
);
