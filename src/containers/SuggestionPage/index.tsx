import SuggestionLinks from './SuggestionLinks';

export default function SuggestionPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <p className="mt-2 font-mosk text-2xl font-bold tracking-wide md:text-3xl">Make Suggestions</p>
        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300 md:text-base lg:mt-6 lg:text-lg lg:leading-8">
          What do you think about the website? What should be added or changed? Are there mistakes in the courses? Or is
          there something else you wanna let us know? Feel free to send me an email or fill in the Google Form.
        </p>
      </div>
      <SuggestionLinks />
    </div>
  );
}
