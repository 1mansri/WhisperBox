'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from "sonner"
import { ApiResponse } from '@/types/Apiresponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { verifySchema } from '@/schemas/verifySchema';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"

export default function VerifyAccount() {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post<ApiResponse>(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });

      toast.success('Success',{
        description: response.data.message,
      });

      router.replace('/sign-in');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error( 'Verification Failed',{
        description:
          axiosError.response?.data.message ??
          'An error occurred. Please try again.'
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-700">
      <div className="w-full max-w-md p-8 space-y-8 bg-white border border-purple-700 shadow-black rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup  >
                      <InputOTPSlot className='bg-gray-300 border border-black' index={0} />
                      <InputOTPSlot className='bg-gray-300 border border-black' index={1} />
                      <InputOTPSlot className='bg-gray-300 border border-black' index={2} />
                      <InputOTPSlot className='bg-gray-300 border border-black' index={3} />
                      <InputOTPSlot className='bg-gray-300 border border-black' index={4} />
                      <InputOTPSlot className='bg-gray-300 border border-black' index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the verification code sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
              )}
            />
            
            <Button type="submit">Verify</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}