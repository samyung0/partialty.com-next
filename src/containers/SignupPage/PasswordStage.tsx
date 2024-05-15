import { Separator } from '~/components/Separator';
import PasswordForm from './PasswordForm';
import Image from 'next/image';
import Link from 'next/link';
import { type z } from 'zod';
import { type BioFormCombinedSchema } from '~/definition/signup';
import { redirect } from 'next/navigation';

interface Props {
  setState: (values: Partial<z.infer<typeof BioFormCombinedSchema>>) => any;
  setPage: (page: number) => any;
}

export default function PasswordStage({ setState, setPage }: Props) {
  return (
    <div className="max-h-[80dvh] w-[95vw]  overflow-auto rounded-lg border-2 border-black bg-white py-16 dark:bg-highlight-dark md:w-[50vw] md:min-w-[500px] md:max-w-[600px]">
      <div className="mx-auto max-w-[500px] px-12 sm:px-16 md:px-24">
        <h1 className="pb-6 text-center font-mosk text-2xl font-bold md:text-3xl md:tracking-wider">Sign Up</h1>
        <br />

        <PasswordForm setState={setState} setPage={setPage} />

        <div className="relative mx-auto my-8 mb-4 flex items-center self-stretch md:my-10 md:mb-6">
          <Separator className="shrink" />
          <span className="px-4 tracking-wide">or</span>
          <Separator className="shrink" />
        </div>

        <div className="mx-auto flex w-[60%] items-center justify-evenly self-stretch md:w-full">
          <a className="p-4 pt-0" aria-label="Login With Google" href="/login/google/">
            <Image
              src={'/svg/logo-google.svg'}
              alt="Login With Google"
              width={55}
              height={55}
              className="size-[45px] md:size-[55px]"
            />
          </a>
          <a className="p-4 pt-0" aria-label="Login With Github" href="/login/github/">
            <Image
              src={'/svg/logo-github.svg'}
              alt="Login With Github"
              width={50}
              height={50}
              className="size-[35px] md:size-[50px]"
            />
          </a>
        </div>

        <div className="text-center md:pt-4">
          <Link prefetch href="/login" className="inline-block text-sm underline underline-offset-[6px]">
            Have an account already? Come here
          </Link>
        </div>
      </div>
    </div>
  );
}
