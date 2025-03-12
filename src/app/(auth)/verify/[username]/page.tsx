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
import { motion } from "framer-motion";
import { CheckCircle, Mail, KeyRound } from "lucide-react";

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

      toast.success('Verification Successful', {
        description: response.data.message || "Your account has been verified. Redirecting to login...",
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      });

      router.replace('/sign-in');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error('Verification Failed', {
        description:
          axiosError.response?.data.message ??
          'The code you entered is incorrect or has expired. Please try again.',
      });
    }
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Custom slot animation
  const slotVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md p-8 space-y-8 bg-white/10 backdrop-blur-xl border border-indigo-500/30 shadow-2xl rounded-2xl relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
        
        <motion.div variants={itemVariants} className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-pink-300">
            Verify Your Account
          </h1>
          <p className="mb-4 text-indigo-100">Check your inbox for the verification code we&apos;ve sent</p>
        </motion.div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div variants={itemVariants}>
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-indigo-100 text-center block text-lg">Enter 6-Digit Code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="gap-2 sm:gap-4 justify-center">
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <motion.div
                              key={index}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              variants={slotVariants}
                              transition={{ delay: index * 0.08 }}
                            >
                              <InputOTPSlot 
                                index={index} 
                                className="w-10 h-14 sm:w-12 sm:h-16 bg-white/20 backdrop-blur-sm border-indigo-400/50 hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 text-white text-xl rounded-lg" 
                              />
                            </motion.div>
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription className="text-center text-indigo-200/80">
                      Didn&apos;t receive the code? Check your spam folder
                    </FormDescription>
                    <FormMessage className="text-pink-300" />
                  </FormItem>
                )}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="flex justify-center pt-2">
                <Button 
                  type="submit"
                  className="w-full sm:w-auto px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-medium rounded-xl shadow-lg shadow-indigo-700/30 hover:shadow-indigo-700/50 transition-all duration-300 text-lg flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-5 h-5" />
                  <span>Verify Account</span>
                </Button>
              </div>
            </motion.div>
            
            {/* <motion.div variants={itemVariants} className="text-center">
              <button
                type="button"
                className="text-indigo-300 hover:text-indigo-100 text-sm flex items-center gap-1 mx-auto transition-colors duration-200"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Resend verification code</span>
              </button>
            </motion.div> */}
          </form>
        </Form>
      </motion.div>
    </div>
  );
}