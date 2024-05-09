"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form";
import { Input } from "~/components/Input";
import { Loader } from "~/components/Loader";
import { LoginFormSchema, LoginFormState } from "~/definition/login";
import { login } from "~/server/profiles";

const FormButton = ({ pending }: { pending: boolean }) => {
  return (
    <>
      {!pending && (
        <Button
          type="submit"
          className="mx-auto flex rounded-lg p-3 !px-12 md:p-4"
        >
          Login
        </Button>
      )}
      {pending && (
        <Button className="mx-auto flex rounded-lg p-3 !px-12 md:p-4">
          <Loader />
        </Button>
      )}
    </>
  );
};

export function LoginForm() {
  const firstField = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<LoginFormState>(undefined);

  useEffect(() => {
    firstField.current?.focus();
  }, []);

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (e?: BaseSyntheticEvent) => {
    setLoading(true);
    await form.handleSubmit(async (e) => {
      const state = await login(e);
      setFormState(state);
    })(e);
    setLoading(false);
  };

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) =>
      setFormState(undefined),
    );
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
                <Input
                  placeholder="Whats ur email"
                  {...field}
                  ref={firstField}
                />
              </FormControl>
              {/* Client side validation error */}
              <FormMessage />
              {/* Error after submitting form */}
              {formState?.errors?.email && (
                <FormMessage>{formState?.errors?.email}</FormMessage>
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
                <Input
                  type="password"
                  placeholder="Whats ur password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              {formState?.errors?.password && (
                <FormMessage>{formState?.errors?.password}</FormMessage>
              )}
              {formState?.formErrors && (
                <FormMessage>{formState?.formErrors}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormButton pending={loading} />
      </form>
    </Form>
  );
}
