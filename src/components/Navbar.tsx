"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LogOut,
  LogIn,
  MessageSquare,
  User as UserIcon,
  Home,
  Sparkles,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user as User;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`sticky top-0 z-50 py-4 transition-all ease-in-out scroll-smooth duration-300 ${
        scrolled
          ? "bg-black/40 backdrop-blur-xl shadow-lg"
          : "bg-gradient-to-l from-pink-800 via-purple-700 to-indigo-800 "
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" passHref>
            <motion.div
              className="flex items-center space-x-2 font-bold"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-2 rounded-lg shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent font-extrabold tracking-tight hidden sm:inline">
                WhisperBox
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-row justify-between items-center space-x-2">
            {/* <Link href="/" className="relative group">
              <Button
                variant="ghost"
                className="text-white/80 hover:text-white"
              >
                <Home className="h-4 w-4 mr-1" />
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Button>
            </Link> */}
            <div className="flex flex-row justify-center space-x-2 items-center">
              <div className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
                <Link href="/">
                  <div className="flex items-center space-x-2">
                    <div className="bg-gradient-to-tl from-pink-500 to-purple-500 p-1 rounded-full">
                      <Home className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm font-medium text-white">Home</span>
                  </div>
                </Link>
              </div>

              {session && (
                <div className="flex flex-row justify-around items-center gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
                    <div className="flex items-center space-x-2">
                      <div className="bg-gradient-to-br from-pink-500 to-purple-500 p-1 rounded-full">
                        <UserIcon className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {user?.username || user?.email?.split("@")[0]}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
                    <Link href="/dashboard">
                      <div className="flex items-center space-x-2">
                        <div className="bg-gradient-to-br from-pink-500 to-purple-500 p-1 rounded-full">
                          <MessageSquare className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm font-medium text-white">
                          Messages
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <AnimatePresence mode="wait">
              {session ? (
                <motion.div
                  key="logged-in"
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* <div className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
                    <div className="flex items-center space-x-2">
                      <div className="bg-gradient-to-br from-pink-500 to-purple-500 p-1 rounded-full">
                        <UserIcon className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {user?.username || user?.email?.split("@")[0]}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
                    <Link href="/dashboard">
                      <div className="flex items-center space-x-2">
                        <div className="bg-gradient-to-br from-pink-500 to-purple-500 p-1 rounded-full">
                          <MessageSquare className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm font-medium text-white">
                          Messages
                        </span>
                      </div>
                    </Link>
                  </div> */}

                  <Button
                    onClick={() => signOut()}
                    className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full border border-white/10"
                    variant="ghost"
                  >
                    <LogOut className="h-4 w-4 mr-1.5" />
                    Sign out
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="logged-out"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href="/sign-in">
                    <Button
                      className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full border border-white/10"
                      variant="ghost"
                    >
                      <LogIn className="h-4 w-4 mr-1.5" />
                      Sign in
                    </Button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white h-9 w-9 rounded-full bg-white/10 border border-white/10 backdrop-blur-md"
                >
                  {isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-gradient-to-br from-indigo-900/95 to-purple-900/95 backdrop-blur-xl border-l border-white/10 p-0">
                <div className="flex flex-col h-full">
                  <SheetTitle className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-2 rounded-lg shadow-lg">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xl bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent font-extrabold tracking-tight">
                        WhisperBox
                      </span>
                    </div>
                    {/* <Button size="icon" variant="ghost" className="text-white h-8 w-8 rounded-full" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button> */}
                  </SheetTitle>

                  <div className="flex flex-col p-6 space-y-4 flex-grow">
                    <Link
                      href="/"
                      className="block"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        className="bg-white/10 w-full backdrop-blur-md hover:bg-white/20 text-white rounded-full border border-white/10"
                        size="lg"
                      >
                        <Home className="h-5 w-5 mr-2" />
                        Home
                      </Button>
                    </Link>

                    <AnimatePresence mode="wait">
                      {session ? (
                        <motion.div
                          key="mobile-logged-in"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4"
                        >
                          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/10">
                            <div className="flex items-center space-x-3">
                              <div className="bg-gradient-to-br from-pink-500 to-purple-500 p-2 rounded-full">
                                <UserIcon className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <span className="text-sm text-white/60">
                                  Signed in as
                                </span>
                                <p className="text-white font-medium">
                                  {user?.username || user?.email}
                                </p>
                              </div>
                            </div>
                          </div>

                          <Link
                            href="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="block"
                          >
                            <Button
                              className="bg-white/10 w-full backdrop-blur-md hover:bg-white/20 text-white rounded-full border border-white/10"
                              size="lg"
                            >
                              <MessageSquare className="h-5 w-5 mr-2" />
                              View Messages
                            </Button>
                          </Link>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="mobile-logged-out"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4"
                        >
                          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/10">
                            <p className="text-white">
                              Experience secure, private messaging with
                              WhisperBox
                            </p>
                          </div>

                          <Link
                            href="/sign-in"
                            onClick={() => setIsOpen(false)}
                            className="block"
                          >
                            <Button
                              className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full border border-white/10"
                              variant="ghost"
                            >
                              <LogIn className="h-4 w-4 mr-2" />
                              Sign in
                            </Button>
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {session && (
                    <div className="p-6 border-t border-white/10">
                      <Button
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                        className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-lg w-full border border-white/10"
                        variant="ghost"
                        size="lg"
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Sign out
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
