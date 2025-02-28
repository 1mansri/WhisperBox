"use client";
import * as React from "react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
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
import { Instagram, X } from "lucide-react";
import { Message } from "@/models/User.model";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/Apiresponse";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
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

  const shareAsImage = async () => {
    if (!messageCardRef.current) return;

    try {
      // Create a wrapper div with gradient background
      const wrapper = document.createElement("div");
      wrapper.style.background = "#ffede0";
      wrapper.style.padding = "48px";
      wrapper.style.width = "800px";
      wrapper.style.borderRadius = "24px";
      wrapper.style.display = "flex";
      wrapper.style.flexDirection = "column";
      wrapper.style.gap = "24px";

      // Style the message
      const messageDiv = document.createElement("div");
      messageDiv.style.fontSize = "32px";
      messageDiv.style.fontWeight = "600";
      messageDiv.style.color = "#525252";
      messageDiv.style.lineHeight = "1.4";
      messageDiv.textContent = message.content;
      wrapper.appendChild(messageDiv);

      // Style the date
      const dateDiv = document.createElement("div");
      dateDiv.style.fontSize = "16px";
      dateDiv.style.color = "#6B7280";
      dateDiv.textContent = new Date(message.createdAt).toLocaleDateString();
      wrapper.appendChild(dateDiv);

      // Add branding
      const brandingDiv = document.createElement("div");
      brandingDiv.style.marginTop = "32px";
      brandingDiv.style.color = "#4B5563";
      brandingDiv.style.fontSize = "14px";
      brandingDiv.style.fontFamily = "system-ui, -apple-system, sans-serif";
      brandingDiv.style.textAlign = "center";
      brandingDiv.textContent = "shared via Mystery Messages";
      wrapper.appendChild(brandingDiv);

      // Temporarily append to body for html2canvas
      wrapper.style.position = "fixed";
      wrapper.style.left = "-9999px";
      document.body.appendChild(wrapper);

      const canvas = await html2canvas(wrapper, {
        backgroundColor: "#ffede0",
        scale: 2,
        logging: false,
        useCORS: true,
      });

      document.body.removeChild(wrapper);

      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = `mystery-message-${message._id}.png`;
      link.href = image;
      link.click();

      toast.success(
        "Image downloaded! You can now share it on Instagram or as a status."
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
      toast.info(response.data.message);
      onMessageDelete(message._id);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data.message ?? "Failed to delete message",
      });
    }
  };

  return (
    <motion.div
      ref={messageCardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-lg p-6 shadow-lg relative group"
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="message-text">{message.content}</CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <X className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="text-sm">
          {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent hover:text-accent-foreground"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Share2 className="h-4 w-4" />
                    </motion.div>
                  </motion.div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2">
                <div className="flex flex-col gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={shareAsImage}
                    className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                  >
                    <Instagram className="h-4 w-4" />
                    <span>Save as Image</span>
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
