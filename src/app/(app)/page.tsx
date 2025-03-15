'use client';

import { MessageSquare, Star, Heart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 md:px-24 py-16">
        <div className="max-w-4xl w-full text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 tracking-tight mb-6">
            Speak Freely, Connect Authentically
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            WhisperBox — Where honest feedback thrives in the shadows of anonymity.
            Discover what people really think without the barriers of identity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/sign-up">
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium text-lg hover:shadow-lg hover:opacity-90 transition duration-300 w-full sm:w-auto">
                Get Started
              </button>
            </Link>
            <Link href="/sign-in">
              <button className="px-6 py-3 rounded-full bg-indigo-800 bg-opacity-50 backdrop-blur-sm text-white border border-indigo-400 font-medium text-lg hover:bg-opacity-70 transition duration-300 w-full sm:w-auto">
                Sign In
              </button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full max-w-6xl">
          <Card className="bg-indigo-800 bg-opacity-20 backdrop-blur-md border-indigo-700 text-white hover:shadow-xl transition duration-300">
            <CardHeader>
              <MessageSquare className="h-8 w-8 text-pink-400 mb-2" />
              <CardTitle className="text-xl font-semibold text-indigo-100">Anonymous Messaging</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-indigo-200">Share your thoughts without revealing your identity. Freedom to express without judgment.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-indigo-800 bg-opacity-20 backdrop-blur-md border-indigo-700 text-white hover:shadow-xl transition duration-300">
            <CardHeader>
              <Heart className="h-8 w-8 text-pink-400 mb-2" />
              <CardTitle className="text-xl font-semibold text-indigo-100">Genuine Connections</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-indigo-200">Build relationships based on authentic feedback rather than social expectations.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-indigo-800 bg-opacity-20 backdrop-blur-md border-indigo-700 text-white hover:shadow-xl transition duration-300">
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-pink-400 mb-2" />
              <CardTitle className="text-xl font-semibold text-indigo-100">Personal Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-indigo-200">Learn how others perceive you and use that insight to evolve and improve.</p>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials Carousel */}
        <div className="w-full max-w-4xl bg-indigo-800 bg-opacity-20 backdrop-blur-lg p-6 rounded-xl border border-indigo-700">
          <h2 className="text-2xl font-bold text-center text-white mb-8">What Our Users Receive</h2>
          <Carousel
            plugins={[Autoplay({ delay: 3000 })]}
            className="w-full"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index} className="p-1 md:p-4">
                  <Card className="bg-gradient-to-br from-indigo-900 to-purple-900 border-indigo-700 text-white">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-semibold text-pink-200">{message.title}</CardTitle>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="italic text-indigo-100 mb-3">&quot;{message.content}&quot;</p>
                      <p className="text-xs text-indigo-300 text-right">
                        Received {message.received}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white bg-indigo-500 border-indigo-400 max-md:ml-2 hover:bg-indigo-700" />
            <CarouselNext className="text-white bg-indigo-500 max-md:mr-2 border-indigo-400 hover:bg-indigo-700" />
          </Carousel>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-6 bg-indigo-950 text-indigo-300 border-t border-indigo-800">
        <div className="max-w-6xl mx-auto">
          <p className="mb-2">© 2025 WhisperBox. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a target='_blank' href="https://durgeshtechportfolio.netlify.app/" className="text-indigo-300 hover:text-pink-300 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
