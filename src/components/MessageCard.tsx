"use client";
import * as React from "react";
import dayjs from "dayjs";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Instagram, Trash2, Share2, MessageCircleMore } from "lucide-react";
import { Message } from "@/models/User.model";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/Apiresponse";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import html2canvas from "html2canvas";
import { useRef } from "react";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
  baseUrl: string;
};

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const messageCardRef = useRef<HTMLDivElement>(null);

  const shareAsImage = async (platform: 'instagram' | 'whatsapp') => {
    if (!messageCardRef.current) return;

    try {
      // Create a wrapper div with gradient background
      const wrapper = document.createElement("div");
      
      // Different styling based on platform
      if (platform === 'instagram') {
        wrapper.style.background = "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)";
      } else {
        wrapper.style.background = "linear-gradient(135deg, #4f46e5, #7e22ce)";
      }
      
      wrapper.style.padding = "48px";
      wrapper.style.width = "800px";
      wrapper.style.borderRadius = "24px";
      wrapper.style.display = "flex";
      wrapper.style.flexDirection = "column";
      wrapper.style.gap = "24px";
      wrapper.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.2)";

      // Style the message
      const messageDiv = document.createElement("div");
      messageDiv.style.fontSize = "32px";
      messageDiv.style.fontWeight = "600";
      messageDiv.style.color = "#ffffff";
      messageDiv.style.lineHeight = "1.4";
      messageDiv.textContent = message.content;
      messageDiv.style.textShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
      wrapper.appendChild(messageDiv);

      // Style the date
      const dateDiv = document.createElement("div");
      dateDiv.style.fontSize = "16px";
      dateDiv.style.color = "rgba(255, 255, 255, 0.9)";
      dateDiv.textContent = new Date(message.createdAt).toLocaleDateString();
      wrapper.appendChild(dateDiv);

      // Add branding
      const brandingDiv = document.createElement("div");
      brandingDiv.style.marginTop = "32px";
      brandingDiv.style.color = "rgba(255, 255, 255, 0.8)";
      brandingDiv.style.fontSize = "14px";
      brandingDiv.style.fontFamily = "system-ui, -apple-system, sans-serif";
      brandingDiv.style.textAlign = "center";
      brandingDiv.textContent = "✨ shared via WhisperBox ✨";
      wrapper.appendChild(brandingDiv);

      // Temporarily append to body for html2canvas
      wrapper.style.position = "fixed";
      wrapper.style.left = "-9999px";
      document.body.appendChild(wrapper);

      const canvas = await html2canvas(wrapper, {
        scale: 2,
        logging: false,
        useCORS: true,
      });

      document.body.removeChild(wrapper);

      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = `WhisperBox-${message._id}.png`;
      link.href = image;
      link.click();

      toast.success(
        `Image downloaded! Ready to share on ${platform === 'instagram' ? 'Instagram' : 'WhatsApp'}.`,
        {
          icon: platform === 'instagram' ? '📸' : '💬',
          style: { background: platform === 'instagram' ? '#E1306C' : '#25D366', color: 'white' }
        }
      );
    } catch (error) {
      toast.error("Failed to generate image" + error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );
      toast.info(response.data.message, {
        icon: <Trash2 className="h-4 w-4" />,
      });
      onMessageDelete(message._id);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data.message ?? "Failed to delete message",
      });
    }
  };

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)",
      transition: {
        duration: 0.3
      }
    }
  };

  // Button animation variants
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.div
      ref={messageCardRef}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-indigo-500/30 relative group overflow-hidden"
    >
      {/* Decorative elements */}
      {/* <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl"></div>
       */}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="message-text text-lg font-bold text-indigo-500 dark:text-indigo-200">
            {message.content}
          </CardTitle>
          <AlertDialog  >
            <AlertDialogTrigger asChild>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="text-rose-500 hover:text-rose-600 bg-rose-100 hover:bg-rose-200 p-2 rounded-full transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gradient-to-br backdrop-blur-3xl from-slate-900 to-indigo-950 text-white border max-md:max-w-[90%] rounded-lg border-indigo-500/50">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-rose-300">Are you sure you want to delete?</AlertDialogTitle>
                <AlertDialogDescription className="text-slate-300">
                  This magical message will disappear forever once deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-slate-800 text-white hover:bg-slate-700 border border-slate-600">
                  Keep it
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteConfirm}
                  className="bg-rose-500 hover:bg-rose-600 text-white"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
            
          </AlertDialog>
        </div>
        <div className="text-sm text-purple-400 dark:text-purple-300 mt-1 font-medium">
          {dayjs(message.createdAt).format("MMM D, YYYY • h:mm A")}
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </motion.button>
              </PopoverTrigger>
              <PopoverContent className="w-56 ml-8 mt-2 p-3 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border border-indigo-300 dark:border-indigo-800 shadow-xl">
                <div className="flex flex-col gap-2">
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => shareAsImage('instagram')}
                    className="flex items-center gap-2 p-2 hover:bg-purple-100 dark:hover:bg-purple-900/40 rounded-md cursor-pointer transition-colors duration-200"
                  >
                    <Instagram className="h-4 w-4 text-pink-600" />
                    <span className="text-sm font-medium">Save for Instagram</span>
                  </motion.button>
                  
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => shareAsImage('whatsapp')}
                    className="flex items-center gap-2 p-2 hover:bg-purple-100 dark:hover:bg-purple-900/40 rounded-md cursor-pointer transition-colors duration-200"
                  >
                    <MessageCircleMore className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Save for WhatsApp</span>
                  </motion.button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </motion.div>
  );
}
