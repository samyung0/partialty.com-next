import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
  return (
    <section className="flex h-[100vh] items-center justify-center bg-light-yellow dark:bg-primary-dark-gray dark:text-background-light-gray">
      <div className="max-h-[80dvh] w-[95vw]  overflow-auto rounded-lg border-2 border-black bg-white py-16 dark:bg-highlight-dark md:w-[50vw] md:min-w-[500px] md:max-w-[600px]">
        <div className="mx-auto max-w-[500px] px-24">
          <h1 className="pb-6 text-center font-mosk text-2xl font-bold md:text-3xl md:tracking-wider">
            Login
          </h1>
          <br />

          <LoginForm />

          <div className="relative mx-auto my-8 mb-4 flex items-center self-stretch md:my-10 md:mb-6">
            <span className="inline-block h-[3px] flex-1 bg-black/10 dark:bg-gray-300"></span>
            <span className="px-4 tracking-wide">or</span>
            <span className="inline-block h-[3px] flex-1 bg-black/10 dark:bg-gray-300"></span>
          </div>

          <div className="mx-auto flex w-[60%] items-center justify-evenly self-stretch md:w-full">
            <Link
              className="p-4 pt-0"
              aria-label="Login With Google"
              href="/login/google/"
            >
              <Image
                src={"/svg/logo-google.svg"}
                alt="Login With Google"
                width={55}
                height={55}
                className="size-[45px] md:size-[55px]"
              />
            </Link>
            <Link
              className="p-4 pt-0"
              aria-label="Login With Github"
              href="/login/github/"
            >
              <Image
                src={"/svg/logo-github.svg"}
                alt="Login With Github"
                width={50}
                height={50}
                className="size-[35px] md:size-[50px]"
              />
            </Link>
          </div>

          <div className="text-center md:pt-4">
            <Link
              prefetch
              href="/signup/"
              className="inline-block text-sm underline decoration-wavy underline-offset-[6px]"
            >
              New User? Click Here to Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
