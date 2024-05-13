import SuggestionLinks from "./SuggestionLinks";

export default function SuggestionPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <p className="mt-2 font-mosk md:text-3xl font-bold tracking-wide text-2xl">
          Make Suggestions
        </p>
        <p className="lg:mt-6 mt-3 lg:text-lg md:text-base text-sm lg:leading-8 leading-6 text-gray-600 dark:text-gray-300">
          What do you think about the website? What should be added or changed?
          Are there mistakes in the courses? Or is there something else you
          wanna let us know? Feel free to send me an email or fill in the Google
          Form.
        </p>
      </div>
      <SuggestionLinks />
    </div>
  );
}
