'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { 
  Menu, 
  X, 
  LogOut, 
  LogIn, 
  MessageSquare, 
  User as UserIcon,
  Sparkles
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'

const Navbar = () => {
  const { data: session } = useSession()
  const user = session?.user as User
  const [isOpen, setIsOpen] = useState(false)
  const logoRef = useRef(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // GSAP animation for the logo on mount
  useEffect(() => {
    gsap.from(logoRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: "power3.out"
    })
  }, [])

  // Handle menu animation with GSAP
  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(menuRef.current.querySelectorAll('.menu-item'), 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.4,
          ease: "power2.out"
        }
      )
    }
  }, [isOpen])

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b py-3 backdrop-blur-md"
      style={{ 
        backgroundColor: 'rgba(67, 56, 202, 0.85)', 
        borderBottomColor: 'rgba(255,255,255,0.1)' 
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" passHref>
            <motion.div 
              ref={logoRef}
              className="flex items-center space-x-2 font-bold text-xl"
              style={{ color: '#f471b5' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="h-6 w-6" style={{ color: '#f471b5' }} />
              <span className="hidden sm:inline">WhisperBox</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <AnimatePresence mode="wait">
              {session ? (
                <motion.div 
                  key="logged-in"
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="flex items-center space-x-2 rounded-full px-4 py-2"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.25)" }}
                  >
                    <UserIcon className="h-4 w-4" style={{ color: '#f471b5' }} />
                    <span className="text-sm font-medium text-white">
                      {user?.username || user?.email}
                    </span>
                  </motion.div>
                  <Link href="/dashboard">
                    <Button 
                      className="flex items-center space-x-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-md"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Messages
                    </Button>
                  </Link>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      onClick={() => signOut()}
                      className="flex items-center space-x-1 bg-pink-500 hover:bg-pink-600 shadow-md"
                      variant="outline"
                      style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      Sign out
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div 
                  key="logged-out"
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href="/sign-in">
                    <Button 
                      className="flex items-center space-x-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-md"
                    >
                      <LogIn className="h-4 w-4 mr-1" />
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
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                  {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                </Button>
              </SheetTrigger>
              <SheetContent className="backdrop-blur-xl bg-gradient-to-br from-indigo-900/90 to-purple-900/90 border-l border-white/10 text-white">
                <SheetHeader>
                  <SheetTitle className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                    WhisperBox Menu
                  </SheetTitle>
                </SheetHeader>
                <div ref={menuRef} className="flex flex-col space-y-4 mt-4">
                  <Link href="/" className="menu-item flex items-center space-x-2 font-bold text-xl py-2" style={{ color: '#f471b5' }} onClick={() => setIsOpen(false)}>
                    <Sparkles className="h-6 w-6" />
                    <span>WhisperBox</span>
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
                        <div className="menu-item flex items-center space-x-2 py-2 px-3 rounded-lg bg-white/10">
                          <UserIcon className="h-5 w-5" style={{ color: '#f471b5' }} />
                          <span className="text-lg font-medium text-white">
                            {user.username || user.email}
                          </span>
                        </div>
                        <Link href="/dashboard" className="menu-item flex items-center text-lg font-medium space-x-2 py-2 px-3 rounded-lg hover:bg-white/10" onClick={() => setIsOpen(false)}>
                          <MessageSquare className="h-5 w-5 mr-2" style={{ color: '#f471b5' }} />
                          Messages
                        </Link>
                        <Button 
                          onClick={() => {
                            signOut();
                            setIsOpen(false);
                          }}
                          className="menu-item flex items-center justify-center space-x-1 w-full bg-pink-500 hover:bg-pink-600 shadow-md"
                        >
                          <LogOut className="h-4 w-4 mr-1" />
                          Sign out
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="mobile-logged-out"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <Link href="/sign-in" className="w-full" onClick={() => setIsOpen(false)}>
                          <Button 
                            className="menu-item flex items-center justify-center space-x-1 w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-md"
                          >
                            <LogIn className="h-4 w-4 mr-1" />
                            Sign in
                          </Button>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar