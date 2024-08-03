import React from 'react'
import Link from "next/link"


export const Header = () => {
  return (
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