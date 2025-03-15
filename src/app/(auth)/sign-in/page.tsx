'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
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
import { ArrowLeft, Loader2, Mail, Lock } from 'lucide-react';
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
          description: result.error || "Incorrect username or password",
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
    <div className="flex justify-center max-md:px-6 py-8 items-center min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.svg')] opacity-5"></div>
      
      <Button 
        variant="ghost" 
        className="absolute z-50 top-6 left-6 rounded-full text-white bg-white/10 backdrop-blur-md shadow-xl hover:bg-white/20 hover:text-white flex items-center gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </Button>
      
      <div className="w-full max-w-md mt-10 p-8 space-y-8 backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl border border-white/20 relative z-10">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl font-bold">WB</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">
            Welcome Back
          </h1>
          <p className="mb-6 text-indigo-200">Sign in to check your WhisperBox</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email or Username</FormLabel>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-indigo-300">
                      <Mail size={18} />
                    </div>
                    <Input {...field} 
                      placeholder="Enter your email or username" 
                      className="pl-10 bg-transparent border-indigo-200/50 focus:border-indigo-400 text-white placeholder:text-indigo-300"
                      name="email" />
                  </div>
                  <FormMessage className="text-pink-300" />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-indigo-300">
                      <Lock size={18} />
                    </div>
                    <Input 
                      type="password"
                      placeholder="Enter your password" 
                      className="pl-10 bg-transparent border-indigo-200/50 focus:border-indigo-400 text-white placeholder:text-indigo-300"
                      {...field} 
                      name="password" />
                  </div>
                  <FormMessage className="text-pink-300" />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white py-6 rounded-xl shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>
        
        <div className="text-center mt-6">
          <p className="text-indigo-200">
            Curious what others think about you?{' '}
            <Link href="/sign-up" className="text-pink-400 hover:text-pink-300 font-medium">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}