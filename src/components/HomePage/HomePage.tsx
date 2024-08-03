/**
 * v0 by Vercel.
 * @see https://v0.dev/t/k4JRNpNhCXk
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function Component() {
  const [showSignIn, setShowSignIn] = useState(true)
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <KeyboardIcon className="size-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>

        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full h-screen flex items-center">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16 mx-auto">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <motion.h1 initial={{y: 100, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 1, ease: [0.5, 1, 0.89, 1]}}className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] mb-2">
                Type Faster with KeyLabs
                </motion.h1>
                <motion.p initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 1, duration: 1, ease: [0.5, 1, 0.89, 1]}} className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                KeyLabs is a web-based game designed to help you improve your typing skills through engaging and interactive gameplay. Inspired by Aim Labs, KeyLabs combines typing speed and accuracy challenges with interactive elements to make learning fun and effective.
                </motion.p>
                <motion.div initial={{opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 2, duration: 1, ease: [0.5, 1, 0.89, 1]}} className="mt-6 space-x-4">
                  <Button>Get Started</Button>
                  <Button variant="outline">Learn More</Button>
                </motion.div>
              </div>
              <motion.div initial={{opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 2, duration: 1, ease: [0.5, 1, 0.89, 1]}} className="flex flex-col items-start space-y-4">
                {showSignIn ? (
                  <Card className="w-full max-w-[400px] sm:max-w-[450px]">
                    <CardHeader className="space-y-1">
                      <CardTitle className="text-2xl">Sign In</CardTitle>
                      <CardDescription>Enter your credentials to access your account.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input className="text-black" id="name" type="text" placeholder="John Doe" />
                    </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input className="text-black" id="password" type="password" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                    <Button onClick={() => setShowSignIn(!showSignIn)}>{showSignIn ? "Create Account" : "Sign In"}</Button>
                      <Button className="w-[150px]">Sign In</Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card className="w-full max-w-[400px] sm:max-w-[450px]">
                    <CardHeader className="space-y-1">
                      <CardTitle className="text-2xl">Create an Account</CardTitle>
                      <CardDescription>Enter your details to get started.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input className="text-black" id="name" type="text" placeholder="John Doe" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input className="text-black" id="password" type="password" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                        <Button onClick={() => setShowSignIn(!showSignIn)}>{showSignIn ? "Create Account" : "Sign In"}</Button>
                      <Button className="w-[150px]">Create Account</Button>
                    </CardFooter>
                  </Card>
                )}
               
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">New Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Faster iteration. More innovation.</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The platform for mastering typing skills. Focus on improving your speed and accuracy with real-time feedback, automated progress tracking, and engaging interactive exercises.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Real-Time Typing Speed Tracking</h3>
                <p className="text-sm text-muted-foreground">
                Instantly measure your typing speed and accuracy as you play.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Interactive Floating Keyboard</h3>
                <p className="text-sm text-muted-foreground">
                Enhance your typing precision by accurately clicking on a floating keyboard.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Progress and Statistics</h3>
                <p className="text-sm text-muted-foreground">
                Monitor your improvement with detailed statistics and progress tracking.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Global Leaderboard</h3>
                <p className="text-sm text-muted-foreground">
                Compete with players worldwide and see where you rank on the global leaderboard.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Aim Training</h3>
                <p className="text-sm text-muted-foreground">
                Improve your typing and clicking accuracy with dedicated aim training exercises.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Custom Challenges</h3>
                <p className="text-sm text-muted-foreground">
                Create and tackle custom typing challenges to push your skills to the next level.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <Link href="#" prefetch={false}>
              About Us
            </Link>
            <Link href="#" prefetch={false}>
              Our Team
            </Link>
            <Link href="#" prefetch={false}>
              Careers
            </Link>
            <Link href="#" prefetch={false}>
              News
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Products</h3>
            <Link href="#" prefetch={false}>
              Men
            </Link>
            <Link href="#" prefetch={false}>
              Women
            </Link>
            <Link href="#" prefetch={false}>
              Kids
            </Link>
            <Link href="#" prefetch={false}>
              Accessories
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Link href="#" prefetch={false}>
              Blog
            </Link>
            <Link href="#" prefetch={false}>
              Community
            </Link>
            <Link href="#" prefetch={false}>
              Support
            </Link>
            <Link href="#" prefetch={false}>
              FAQs
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Link href="#" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" prefetch={false}>
              Cookie Policy
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Contact</h3>
            <Link href="#" prefetch={false}>
              Support
            </Link>
            <Link href="#" prefetch={false}>
              Sales
            </Link>
            <Link href="#" prefetch={false}>
              Press
            </Link>
            <Link href="#" prefetch={false}>
              Partnerships
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function KeyboardIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 8h.01" />
      <path d="M12 12h.01" />
      <path d="M14 8h.01" />
      <path d="M16 12h.01" />
      <path d="M18 8h.01" />
      <path d="M6 8h.01" />
      <path d="M7 16h10" />
      <path d="M8 12h.01" />
      <rect width="20" height="16" x="2" y="4" rx="2" />
    </svg>
  )
}