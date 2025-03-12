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
  User as UserIcon
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
  const user= session?.user as User
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
      className="sticky top-0 z-50 border-b py-3"
      style={{ backgroundColor: '#3a4a61', borderBottomColor: 'rgba(255,255,255,0.1)' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" passHref>
            <motion.div 
              ref={logoRef}
              className="flex items-center space-x-2 font-bold text-xl"
              style={{ color: '#ff764b' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare className="h-6 w-6" style={{ color: '#ff764b' }} />
              <span className="hidden sm:inline">Mystry message</span>
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
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                  >
                    <UserIcon className="h-4 w-4" style={{ color: '#ff764b' }} />
                    <span className="text-sm font-medium text-white">
                      {user?.username || user?.email}
                    </span>
                  </motion.div>
                  <Link href="/dashboard">
                    <Button 
                      className="flex items-center space-x-1"
                      style={{ backgroundColor: '#ff764b', color: 'white' }}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Dashboard
                    </Button>
                  </Link>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      onClick={() => signOut()}
                      className="flex items-center space-x-1"
                      style={{ backgroundColor: '#ff764b', color: 'white' }}
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      Logout
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
                      className="flex items-center space-x-1"
                      style={{ backgroundColor: '#ff764b', color: 'white' }}
                    >
                      <LogIn className="h-4 w-4 mr-1" />
                      Login
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
                <Button variant="ghost" size="icon" className="h-8 w-8" style={{ color: '#ff764b' }}>
                  {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                </Button>
              </SheetTrigger>
              <SheetContent style={{ backgroundColor: '#3a4a61', color: 'white' }}>
                <SheetHeader>
                  <SheetTitle style={{ color: '#ff764b' }}>Navigation Menu</SheetTitle>
                </SheetHeader>
                <div ref={menuRef} className="flex flex-col space-y-4 mt-4">
                  <Link href="/" className="menu-item flex items-center space-x-2 font-bold text-xl py-2" style={{ color: '#ff764b' }} onClick={() => setIsOpen(false)}>
                    <MessageSquare className="h-6 w-6" />
                    <span>Mystry message</span>
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
                        <div className="menu-item flex items-center space-x-2 py-2">
                          <UserIcon className="h-6 w-6" style={{ color: '#ff764b' }} />
                          <span className="text-lg font-medium text-white">
                            {user.username || user.email}
                          </span>
                        </div>
                        <Link href="/dashboard" className="menu-item flex items-center text-lg font-medium space-x-2 py-2" onClick={() => setIsOpen(false)}>
                          <MessageSquare className="h-6 w-6 mr-2" style={{ color: '#ff764b' }} />
                          Dashboard
                        </Link>
                        <Button 
                          onClick={() => {
                            signOut();
                            setIsOpen(false);
                          }}
                          className="menu-item flex items-center justify-center space-x-1 w-full"
                          style={{ backgroundColor: '#ff764b', color: 'white' }}
                        >
                          <LogOut className="h-4 w-4 mr-1" />
                          Logout
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
                            className="menu-item flex items-center justify-center space-x-1 w-full"
                            style={{ backgroundColor: '#ff764b', color: 'white' }}
                          >
                            <LogIn className="h-4 w-4 mr-1" />
                            Login
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