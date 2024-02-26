'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { actionLoginUser } from '@/lib/server-action/auth-actions';

const LoginPage = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      router.replace('/');
    }
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues: { email: '', password: '' },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (formData: z.infer<typeof FormSchema>) => {
    const { error } = await actionLoginUser(formData);
    if (error) {
      form.reset();
      setSubmitError(error);
      return;
    }
    localStorage.setItem('loggedIn', 'true');
    router.replace('/');
  };

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError('');
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm-justify-center flex w-full flex-col space-y-6 sm:w-[400px]"
      >
        <Link
          href="/"
          className="
          justify-left
          flex
          w-full
          items-center"
        >
          <span
            className="text-4xl
          font-semibold dark:text-white"
          >
            Document Chatbot
          </span>
        </Link>
        <FormDescription
          className="
        text-foreground/60"
        >
          Ask question from your documents and get an answer.
        </FormDescription>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button type="submit" className="w-full p-6" size="lg" disabled={isLoading}>
          {!isLoading ? 'Login' : 'Loading...'}
        </Button>
        {/* <span className="self-container">
          Dont have an account?{' '}
          <Link href="/signup" className="text-primary">
            Sign Up
          </Link>
        </span> */}
      </form>
    </Form>
  );
};

export default LoginPage;
