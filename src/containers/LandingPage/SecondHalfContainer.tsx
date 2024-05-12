import { Footer } from "~/components/Footer";
import FAQPage from "../FAQPage";
import { forwardRef } from "react";

export default forwardRef<HTMLDivElement>(
  function SecondHalfContainer(props, ref) {
    return (
      <>
        <FAQPage topButton={true} />
        <Footer />
      </>
    );
  },
);
