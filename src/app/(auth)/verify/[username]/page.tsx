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
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { verifySchema } from '@/schemas/verifySchema';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { motion } from "framer-motion";
import { CheckCircle, KeyRound, ArrowLeft, ShieldCheck } from "lucide-react";

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

  const goBack = () => {
    router.back();
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
    <div className="flex justify-center md:py-8 max-md:px-6 items-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md p-8 space-y-6 bg-white/10 backdrop-blur-xl border border-indigo-500/30 shadow-2xl rounded-2xl relative overflow-hidden"
      >
        {/* Back button */}
        <motion.button
          variants={itemVariants}
          onClick={goBack}
          className="absolute bg-gray-700/60 hover:bg-gray-600/70 active:shadow-md active:shadow-gray-900 rounded-full px-4 py-2  top-6 left-6 text-indigo-200 hover:text-white transition-colors duration-200 flex items-center gap-1 z-20"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </motion.button>
        
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
        
        <motion.div variants={itemVariants} className="text-center mt-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-pink-300">
            Verify Your Account
          </h1>
          <p className="mb-2 text-indigo-100 max-w-xs mx-auto">
            We&apos;ve sent a 6-digit verification code to your email address
          </p>
        </motion.div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div variants={itemVariants}>
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-indigo-100 text-center block text-lg font-medium">Enter Code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="gap-2 sm:gap-3 flex justify-center">
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <motion.div
                              className="flex items-center justify-center"
                              key={index}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              variants={slotVariants}
                              transition={{ delay: index * 0.08 }}
                            >
                              <InputOTPSlot 
                                index={index} 
                                className="w-10 h-12 sm:w-12 sm:h-14 bg-white/20 backdrop-blur-sm border-2 border-indigo-400/50 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/50 text-white text-xl rounded-lg" 
                              />
                            </motion.div>
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription className="text-center text-indigo-200/80 text-sm">
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
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-medium rounded-xl shadow-lg shadow-indigo-700/30 hover:shadow-indigo-700/50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-5 h-5" />
                  <span>Verify Account</span>
                </Button>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="pt-2">
              <div className="text-center text-indigo-300 ">
                  Need help? <Link href="/" className="text-indigo-300 hover:text-indigo-100 font-medium">Contact Support</Link>
              </div>
            </motion.div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}