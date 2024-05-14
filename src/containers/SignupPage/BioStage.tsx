import { Separator } from '~/components/Separator';
import PasswordForm from './PasswordForm';
import Image from 'next/image';
import Link from 'next/link';
import { type z } from 'zod';
import { type BioFormCombinedSchema } from '~/definition/signup';
import BioForm from './BioForm';
import { MoveLeft } from 'lucide-react';

interface Props {
  setState: (values: Partial<z.infer<typeof BioFormCombinedSchema>>) => any;
  setPage: (page: number) => any;
}

export default function BioStage({ setState, setPage }: Props) {
  return (
    <div className="relative max-h-[80dvh] w-[95vw] overflow-auto rounded-lg border-2 border-black bg-white py-16 dark:bg-highlight-dark md:w-[50vw] md:min-w-[500px] md:max-w-[600px]">
      <div className="absolute left-4 top-4">
        <button
          onClick={() => {
            setPage(0);
          }}
        >
          <MoveLeft className="size-[20px]" />
        </button>
      </div>
      <div className="mx-auto max-w-[500px] px-12 sm:px-16 md:px-24">
        <h1 className="pb-6 text-center font-mosk text-xl font-bold md:text-2xl md:tracking-wider">
          Let&apos;s make a funny profile.
        </h1>
        <br />

        <BioForm setState={setState} setPage={setPage} />
      </div>
    </div>
  );
}
