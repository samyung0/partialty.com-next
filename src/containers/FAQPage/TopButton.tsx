'use client';
export default function TopButton({ buttonAction }: { buttonAction: () => any }) {
  return (
    <button
      className="absolute left-[50%] top-[40px] -translate-x-[50%] text-xs text-gray-600 underline dark:text-gray-300 md:top-[7%] md:text-sm"
      onClick={buttonAction}
    >
      Top
    </button>
  );
}
