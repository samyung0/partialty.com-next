'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { redirect, useRouter } from 'next/navigation';
import { type BaseSyntheticEvent, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { Button } from '~/components/Button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/Form';
import { Input } from '~/components/Input';
import { Loader } from '~/components/Loader';
import { signupContext } from '~/context/SignupContext';
import { type BioFormCombinedSchema, PasswordFormSchema, type SignupFormCombinedState } from '~/definition/signup';
import { passwordStage } from '~/server/profiles';

const PasswordButton = ({ pending }: { pending: boolean }) => {
  return (
    <>
      {!pending && (
        <Button type="submit" className="mx-auto flex rounded-lg p-3 !px-12 md:p-4">
          Next
        </Button>
      )}
      {pending && (
        <Button type="button" disabled className="mx-auto flex rounded-lg p-3 !px-12 md:p-4">
          <Loader />
        </Button>
      )}
    </>
  );
};

interface Props {
  setState: (values: Partial<z.infer<typeof BioFormCombinedSchema>>) => any;
  setPage: (page: number) => any;
}

export default function PasswordForm({ setState, setPage }: Props) {
  const firstField = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<SignupFormCombinedState>(undefined);
  const formData = useContext(signupContext);

  useEffect(() => {
    firstField.current?.focus();
  }, []);

  const form = useForm<z.infer<typeof PasswordFormSchema>>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: useMemo(() => formData, [formData]),
  });

  const handleSubmit = async (e?: BaseSyntheticEvent) => {
    if (loading) return;
    setLoading(true);
    await form.handleSubmit(async (e) => {
      // check re-password in submit since zod resolver cannot handle custom errors

      if (e.password !== e.rePassword) {
        form.setError(
          'rePassword',
          { message: 'Check the passwords! They are not the same.' },
          {
            shouldFocus: false,
          }
        );
        return;
      }

      const state = await passwordStage(e);
      setFormState(state);
      if (state?.success) {
        setState({ ...formData, ...e });
        setPage(1);
      }
    })(e);
    setLoading(false);
  };

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      setFormState(undefined);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Whats ur email" {...field} ref={firstField} />
              </FormControl>
              {/* Client side validation error */}
              <FormMessage />
              {/* Error after submitting form */}
              {formState?.errors?.email && <FormMessage>{formState?.errors?.email}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Whats ur password" {...field} />
              </FormControl>
              <FormMessage />
              {formState?.errors?.password && <FormMessage>{formState?.errors?.password}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Re-enter Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Re-enter password" {...field} />
              </FormControl>
              <FormMessage />
              {formState?.errors?.rePassword && <FormMessage>{formState?.errors?.rePassword}</FormMessage>}
              {formState?.formErrors && <FormMessage>{formState?.formErrors}</FormMessage>}
            </FormItem>
          )}
        />

        <PasswordButton pending={loading} />
      </form>
    </Form>
  );
}
