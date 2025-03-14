"use client";

import { MessageCard } from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Message } from "@/models/User.model";
import { ApiResponse } from "@/types/Apiresponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw, Copy } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";

function UserDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessage ?? false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data.message ??
          "Failed to fetch message settings",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);
        console.log(response.data);
        if (refresh) {
          toast.info("Messages Refreshed", {
            description: "Your latest messages are now displayed",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error("Error", {
          description:
            axiosError.response?.data.message ?? "Failed to fetch messages",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  // Fetch initial state from the server
  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();

    fetchAcceptMessages();
  }, [session, setValue, fetchAcceptMessages, fetchMessages]);

  // Handle switch change
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast.info(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data.message ??
          "Failed to update message settings",
      });
    }
  };

  if (!session || !session.user) {
    return <div></div>;
  }

  const { username } = session.user as User;

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Profile Link Copied!", {
      description: "Your unique profile URL is now in your clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
      <div className="container mx-auto py-12 px-4">
        <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-xl p-8 mb-10">
          <h1 className="text-4xl font-bold mb-6 text-white bg-gradient-to-r from-pink-500 to-indigo-600 bg-clip-text text-transparent">
            Your Message Dashboard
          </h1>

          <div className="mb-8 bg-white/20 p-6 rounded-xl backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-3 text-white">Share Your Profile Link</h2>
            <div className="flex items-center">
              <div className="flex-1 bg-white/30 border border-indigo-300 rounded-l-lg p-3 h-12 text-white overflow-hidden">
                <p className="truncate">{profileUrl}</p>
              </div>
              <Button
                className="rounded-l-none rounded-r-lg bg-indigo-600 hover:bg-indigo-700 text-white h-12 flex items-center gap-2 px-4 py-3"
                onClick={copyToClipboard}
              >
                <Copy size={18} />
                <span>Copy</span>
              </Button>
            </div>
            <p className="text-indigo-200 text-sm mt-2">
              Share this link with friends to receive anonymous messages
            </p>
          </div>

          <div className="mb-8 flex items-center gap-3 bg-white/20 p-5 rounded-xl backdrop-blur-sm">
            <Switch
              {...register("acceptMessages")}
              checked={acceptMessages}
              onCheckedChange={handleSwitchChange}
              disabled={isSwitchLoading}
              className="data-[state=checked]:bg-indigo-600"
            />
            <div>
              <span className="text-white font-medium ml-2">
                Accept Messages: {acceptMessages ? "Enabled" : "Disabled"}
              </span>
              <p className="text-indigo-200 text-sm">
                {acceptMessages 
                  ? "You're currently receiving anonymous messages" 
                  : "Turn on to start receiving anonymous messages"}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Your Messages</h2>
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              fetchMessages(true);
            }}
            className="bg-white/20 border-indigo-300 text-white hover:bg-white/30"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <RefreshCcw className="h-5 w-5" />
            )}
            <span className="ml-2">Refresh</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageCard
                key={message._id}
                message={message}
                onMessageDelete={handleDeleteMessage}
                baseUrl={baseUrl}
              />
            ))
          ) : (
            <div className="col-span-full text-center backdrop-blur-md bg-white/10 rounded-xl p-10">
              <p className="text-white text-lg mb-2">Your message box is empty</p>
              <p className="text-indigo-200">Share your profile link to start receiving anonymous messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;