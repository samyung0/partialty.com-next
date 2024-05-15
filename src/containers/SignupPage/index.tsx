'use client';

import { useState } from 'react';
import { type z } from 'zod';
import { motion } from 'framer-motion';
import { signupContext } from '~/context/SignupContext';
import { type BioFormCombinedSchema } from '~/definition/signup';
import PasswordStage from './PasswordStage';
import { defaultSignupValue } from '~/context/SignupContext';
import BioStage from './BioStage';

export default function SignupPage() {
  const [state, setState] = useState<Partial<z.infer<typeof BioFormCombinedSchema>>>(defaultSignupValue);
  const [page, setPage] = useState(0);

  return (
    <signupContext.Provider value={state}>
      <section className="flex h-[100vh] items-center justify-center bg-light-yellow dark:bg-primary-dark-gray dark:text-background-light-gray">
        <div className="w-[95vw] overflow-hidden md:w-[50vw] md:min-w-[500px]  md:max-w-[600px] ">
          <div className="flex w-[190vw] items-center justify-start overflow-hidden md:w-[100vw] md:min-w-[1000px] md:max-w-[1200px]">
            <motion.div initial={{ x: '0' }} animate={{ x: page === 1 ? '-100%' : '0' }}>
              <PasswordStage setState={setState} setPage={setPage} />
            </motion.div>
            <motion.div initial={{ x: '0' }} animate={{ x: page === 1 ? '-100%' : '0' }}>
              <BioStage setState={setState} setPage={setPage} />
            </motion.div>
          </div>
        </div>
      </section>
    </signupContext.Provider>
  );
}
