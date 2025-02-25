'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from "sonner"
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signInSchema } from '@/schemas/signInSchema';
import { signIn } from 'next-auth/react';

export default function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema >>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });


  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    console.log("clicked on sign in button")
    setIsSubmitting(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      })
      console.log(result);
      if (result?.error) {
        toast.error("Login Failed", {
          description: result.error || "Incorrect username or Password",
        });
      }
      if (result?.url) {
        router.replace('/dashboard')
      }
      setIsSubmitting(false);
    } catch (error: Error | unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An error occurred while logging in";
        
      toast.error("Error", {
        description: errorMessage,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Your True Feedback
          </h1>
          <p className="mb-4">Sign In to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credential</FormLabel>
                  <Input {...field} 
                    placeholder="Enter Your Email or Username" className="border border-gray-700"
                    name="email" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password"
                     placeholder="Enter Your Password" className="border border-gray-700"
                    {...field} name="password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='w-full'
              onClick={() =>{console.log("clicked on sign in button")}} 
              disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Want to know what others think about you? <br /> {' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
