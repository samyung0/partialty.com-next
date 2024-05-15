'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { Button } from '~/components/Button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/Form';
import { Input } from '~/components/Input';
import { Loader } from '~/components/Loader';
import { LoginFormSchema, type LoginFormState } from '~/definition/login';
import { login } from '~/server/profiles';

const FormButton = ({ pending }: { pending: boolean }) => {
  return (
    <>
      {!pending && (
        <Button type="submit" className="mx-auto flex rounded-lg p-3 !px-12 md:p-4">
          Login
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

export default function LoginForm() {
  const firstField = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<LoginFormState>(undefined);
  const router = useRouter();

  useEffect(() => {
    firstField.current?.focus();
  }, []);

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (e?: BaseSyntheticEvent) => {
    if (loading) return;
    setLoading(true);
    try {
      await form.handleSubmit(async (e) => {
        const state = await login(e);
        if (state?.success) {
          router.push('/');
          return;
        } else {
          setFormState(state);
        }
      })(e);
    } catch (e) {
      setFormState({
        success: false,
        formErrors: [(e as any).toString()],
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => setFormState(undefined));
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
              {formState?.errors?.email && (
                <p className="break-all text-sm font-medium text-tomato">{formState?.errors?.email}</p>
              )}
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
              {formState?.errors?.password && (
                <p className="break-all text-sm font-medium text-tomato">{formState?.errors?.password}</p>
              )}
              {formState?.formErrors && (
                <p className="break-all text-sm font-medium text-tomato">{formState?.formErrors}</p>
              )}
            </FormItem>
          )}
        />

        <FormButton pending={loading} />
      </form>
    </Form>
  );
}
