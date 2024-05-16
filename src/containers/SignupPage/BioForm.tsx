'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type BaseSyntheticEvent, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { Button } from '~/components/Button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/Form';
import { Input } from '~/components/Input';
import { Loader } from '~/components/Loader';
import { defaultSignupValue, signupContext } from '~/context/SignupContext';
import { BioFormCombinedSchema, PasswordFormSchema, type SignupFormCombinedState } from '~/definition/signup';
import { bioStage, passwordStage } from '~/server/profiles';
import SignupDnd from './SignupDnd';
import {  useRouter } from 'next/navigation';

const SignupButton = ({ pending }: { pending: boolean }) => {
  return (
    <>
      {!pending && (
        <Button type="submit" className="mx-auto flex rounded-lg p-3 !px-12 md:p-4">
          Sign Up
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

export default function BioForm({ setState, setPage }: Props) {
  const firstField = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<SignupFormCombinedState>(undefined);
  const formData = useContext(signupContext);
  const router = useRouter();

  useEffect(() => {
    firstField.current?.focus();
  }, []);

  const form = useForm<z.infer<typeof BioFormCombinedSchema>>({
    resolver: zodResolver(BioFormCombinedSchema),
    defaultValues: useMemo(() => formData, [formData]),
  });

  useEffect(() => {
    form.reset(formData);
  }, [form, formData]);

  const handleSubmit = async (e?: BaseSyntheticEvent) => {
    if (loading) return;
    setLoading(true);
    try {
      await form.handleSubmit(
        async (e) => {
          // check re-password in submit since zod resolver cannot handle custom errors
          if (e.password !== e.rePassword) {
            console.error('Password mismatch!');
            setFormState({
              success: false,
              formErrors: ['An unexpected error occured! Try refreshing the page.'],
            });
            return;
          }

          const state = await bioStage(e);
          if (state?.success) {
            router.push('/members/dashboard');
            return;
          } else {
            setFormState(state);
          }
        },
        (e) => {
          console.error(e);
          if (!!e.email || !!e.password || !!e.rePassword) {
            setFormState({
              success: false,
              formErrors: ['An unexpected error occured! Try refreshing the page.'],
            });
          }
        }
      )(e);
    } catch (e) {
      setFormState({
        success: false,
        formErrors: ['An unexpected error occured! ' + (e as any).toString()],
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      setFormState(undefined);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleImageError = useCallback(
    () => (error: string) => {
      setFormState({
        success: false,
        formErrors: [error],
      });
    },
    []
  );

  const handleCustomAvatar = useCallback(
    (isCustom: boolean, imageString: string) => {
      form.setValue('customAvatar', isCustom);
      form.setValue('avatar', imageString);
    },
    [form]
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <div className="hidden">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormControl>
                <FormItem>
                  <Input type="hidden" className="hidden" {...field} />
                </FormItem>
              </FormControl>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormControl>
                <FormItem>
                  <Input type="hidden" className="hidden" {...field} />
                </FormItem>
              </FormControl>
            )}
          />
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormControl>
                <FormItem>
                  <Input type="hidden" className="hidden" {...field} />
                </FormItem>
              </FormControl>
            )}
          />
          <FormField
            control={form.control}
            name="customAvatar"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="checkbox" className="hidden" {...form.register('customAvatar')} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" className="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <SignupDnd error={handleImageError} setCustomAvatar={handleCustomAvatar} />

        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem className="pb-8">
              <FormLabel>Nickname</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Funny nickname" {...field} />
              </FormControl>
              <FormMessage />
              {formState?.errors?.nickname && (
                <p className="break-all text-sm font-medium text-tomato">{formState?.errors?.nickname}</p>
              )}
              {formState?.formErrors && (
                <p className="break-all text-sm font-medium text-tomato">{formState?.formErrors}</p>
              )}
            </FormItem>
          )}
        />

        <SignupButton pending={loading} />
      </form>
    </Form>
  );
}
