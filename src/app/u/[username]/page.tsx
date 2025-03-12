"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, MessageSquareText, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import * as z from "zod";
import { ApiResponse } from "@/types/Apiresponse";
import Link from "next/link";
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";
import { motion } from "framer-motion";

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>(
    initialMessageString.split("||")
  );
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  const [suggestError, setSuggestError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch("content");

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        username,
      });

      toast.success(response.data.message);
      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data.message ?? "Failed to sent message",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    setIsSuggestLoading(true);
    setSuggestError(null);

    try {
      const response = await fetch("/api/suggest-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to get suggestions");
      }

      // Split the questions by the delimiter and clean each message
      const messageList = data.questions
        .split("||")
        .map((message: string) => message.trim().replace(/^['"]|['"]$/g, ""));
      setSuggestedMessages(messageList);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestError("Failed to load suggestions");
      toast.error("Failed to get message suggestions");
    } finally {
      setIsSuggestLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-w-full bg-gradient-to-b from-indigo-900 to-purple-900 min-h-screen">
      <div className="container mx-auto my-8 p-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300 mb-2">
            Send Anonymous Message
          </h1>
          <p className="text-indigo-200">
            Your message will be delivered privately to @{username}
          </p>
        </motion.div>
        
        <Card className="bg-white/10 backdrop-blur-md border border-indigo-200/20 shadow-xl mb-8">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium text-indigo-100">
                        <div className="flex items-center gap-2">
                          <MessageSquareText className="h-5 w-5 text-pink-400" />
                          <span>Write to @{username}</span>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your thoughts anonymously..."
                          className="resize-none bg-white/20 border-indigo-300/30 text-white placeholder:text-indigo-200/70 focus:ring-2 focus:ring-pink-400/50 min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-pink-300" />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center">
                  {isLoading ? (
                    <Button disabled className="bg-gradient-to-r from-indigo-600/80 to-purple-600/80 text-white px-8">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      disabled={isLoading || !messageContent}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md shadow-purple-900/20 px-8"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4 my-8"
        >
          <div className="flex flex-col items-center space-y-4">
            <Button
              onClick={fetchSuggestedMessages}
              className="bg-pink-500 hover:bg-pink-600 text-white shadow-md"
              disabled={isSuggestLoading}
            >
              {isSuggestLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating ideas...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Message Ideas
                </>
              )}
            </Button>
            <p className="text-indigo-200 text-center">
              Need inspiration? Click on any message below to use it.
            </p>
          </div>
          
          <Card className="w-full bg-white/10 backdrop-blur-md border border-indigo-200/20 shadow-xl">
            <CardHeader>
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">
                Message Ideas
              </h3>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {suggestError ? (
                <p className="text-pink-300 col-span-2">{suggestError}</p>
              ) : (
                suggestedMessages.map((message, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="p-4 h-auto text-left text-wrap justify-start border border-indigo-300/30 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-indigo-100"
                    onClick={() => handleMessageClick(message)}
                  >
                    {message}
                  </Button>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        <Separator className="my-6 bg-indigo-300/20" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center bg-white/10 backdrop-blur-md border border-indigo-200/20 rounded-lg p-6 shadow-xl"
        >
          <div className="mb-4 text-lg text-indigo-100">
            Want your own anonymous message board?
          </div>
          <Link href={"/sign-up"}>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md">
              <Sparkles className="mr-2 h-4 w-4" />
              Create Your WhisperBox
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}