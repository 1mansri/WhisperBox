'use client';

import { ApiResponse } from '@/types/Apiresponse';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounceCallback  } from 'usehooks-ts'
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
import axios, { AxiosError } from 'axios';
import { ArrowLeft, Loader2, User, Mail, Lock, CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/schemas/signUpSchema';

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced = useDebounceCallback(setUsername, 500)

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage(''); // Reset message
        try {
          const response = await axios.get<ApiResponse>(
            `/api/check-username-unique?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? 'Error checking username'
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data);
      
      toast.success("Account Created", {
        description: response.data.message
      })

      router.replace(`/verify/${username}`);

      setIsSubmitting(false);
    } catch (error) {
      console.error('Error during sign-up:', error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      const errorMessage = axiosError.response?.data.message;

      toast.error('Sign Up Failed', {
        description: errorMessage || 'There was a problem with your sign-up. Please try again.'
      });

      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center max-md:px-4 items-center min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.svg')] opacity-5"></div>
      
      <Button 
        variant="ghost" 
        className="absolute z-20 top-6 left-6 rounded-full text-white bg-white/10 backdrop-blur-md shadow-xl hover:bg-white/20 hover:text-white flex items-center gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </Button>
      
      <div className="w-full max-w-md p-8  space-y-8 backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl border border-white/20 relative z-10 my-12 max-md:my-20">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl font-bold">WB</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">
            Join True Feedback
          </h1>
          <p className="mb-6 text-indigo-200">Create your account to start receiving messages in your WhisperBox</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Username</FormLabel>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-indigo-300">
                      <User size={18} />
                    </div>
                    <Input 
                      placeholder="Choose your unique username" 
                      className="pl-10 bg-white/20 border-indigo-300/50 focus:border-indigo-400 text-white placeholder:text-indigo-300"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                    />
                  </div>
                  {isCheckingUsername && (
                    <div className="flex items-center mt-1">
                      <Loader2 className="animate-spin h-4 w-4 text-indigo-300 mr-2" />
                      <span className="text-sm text-indigo-300">Checking username...</span>
                    </div>
                  )}
                  {!isCheckingUsername && usernameMessage && (
                    <div className="flex items-center mt-1">
                      {usernameMessage === 'Username is available' ? (
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                      ) : (
                        <XCircle className="h-4 w-4 text-pink-400 mr-2" />
                      )}
                      <p
                        className={`text-sm ${
                          usernameMessage === 'Username is available'
                            ? 'text-green-400'
                            : 'text-pink-400'
                        }`}
                      >
                        {usernameMessage}
                      </p>
                    </div>
                  )}
                  <FormMessage className="text-pink-300" />
                </FormItem>
              )}
            />
            
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-indigo-300">
                      <Mail size={18} />
                    </div>
                    <Input {...field} 
                      placeholder="Enter your email address" 
                      className="pl-10 bg-white/20 border-indigo-300/50 focus:border-indigo-400 text-white placeholder:text-indigo-300"
                      name="email" />
                  </div>
                  <p className='text-indigo-300 text-sm mt-1'>You&apos;ll receive a verification code at this address</p>
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
                      placeholder="Create a secure password" 
                      className="pl-10 bg-white/20 border-indigo-300/50 focus:border-indigo-400 text-white placeholder:text-indigo-300"
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
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </Form>
        
        <div className="text-center mt-6">
          <p className="text-indigo-200">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-pink-400 hover:text-pink-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}