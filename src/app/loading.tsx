import { Loader } from '~/components/Loader';

export default function Loading() {
  return (
    <main className="flex h-[100dvh] w-full items-center justify-center">
      <Loader />
    </main>
  );
}
