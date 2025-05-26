"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <div className="relative w-12 h-12">
              <Image src="/ufc-logo.png" alt="UFC Logo" fill className="object-contain filter brightness-0 invert" />
            </div>
          </Link>

          <nav className="flex items-center space-x-8">
            <button
              onClick={() => handleNavigation("/rankings")}
              className="text-white hover:text-red-600 transition-colors font-medium bg-transparent border-none cursor-pointer"
            >
              Rankings
            </button>
            <button
              onClick={() => handleNavigation("/events")}
              className="text-white hover:text-red-600 transition-colors font-medium bg-transparent border-none cursor-pointer"
            >
              Events
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
