import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import Navbar from "@/src/components/navbar"
import Footer from "@/src/components/footer"
import FighterSection from "@/src/components/fighter-section"
import { fighters } from "@/data/fighters"
import { Volume2, VolumeX } from "lucide-react"
import '@/src/styles/App.css'

function HomePage(){
  const [activeSection, setActiveSection] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([])
  const lastUpdateTime = useRef(0)

  const handleScroll = useCallback(() => {
    const now = Date.now()
    if (now - lastUpdateTime.current < 100) return // Throttle to 100ms
    lastUpdateTime.current = now

    const scrollPosition = window.scrollY + window.innerHeight / 2

    sectionRefs.current.forEach((section, index) => {
      if (!section) return

      const sectionTop = section.offsetTop
      const sectionBottom = sectionTop + section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        setActiveSection((prevActive) => {
          if (prevActive !== index) {
            return index
          }
          return prevActive
        })
      }
    })
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  useEffect(() => {
    // Pause all audio first
    audioRefs.current.forEach((audio) => {
      if (audio && !audio.paused) {
        audio.pause()
        audio.currentTime = 0
      }
    })

    // Play active section audio if not muted and section > 0
    if (activeSection > 0 && !isMuted) {
      const audioIndex = activeSection - 1
      const audio = audioRefs.current[audioIndex]
      if (audio) {
        audio.volume = 0.3
        audio.muted = false
        audio.play().catch((e) => console.log("Audio play failed:", e))
      }
    }
  }, [activeSection, isMuted])

  // Toggle mute for all audio elements
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newMutedState = !prev
      audioRefs.current.forEach((audio) => {
        if (audio) {
          audio.muted = newMutedState
        }
      })
      return newMutedState
    })
  }, [])

  return (
    <main className="min-h-screen bg-black text-white relative">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={(el) => {
          if (el) sectionRefs.current[0] = el
        }}
        className="h-screen flex flex-col items-center justify-center snap-start"
      >
        <div className="relative w-64 h-64 md:w-96 md:h-96">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Multiple shadows to create solid outline effect */}
              <Image
                src="/ufc-logo.png"
                alt="UFC Logo"
                fill
                className="object-contain"
                style={{
                  filter: `
                    drop-shadow(-1px -1px 0 #fff) 
                    drop-shadow(1px -1px 0 #fff) 
                    drop-shadow(-1px 1px 0 #fff) 
                    drop-shadow(1px 1px 0 #fff)
                    drop-shadow(0px -2px 0 #fff)
                    drop-shadow(-2px 0px 0 #fff)
                    drop-shadow(2px 0px 0 #fff)
                    drop-shadow(0px 2px 0 #fff)
                  `,
                }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fighter Sections */}
      {fighters.map((fighter, index) => (
        <FighterSection
          key={fighter.id}
          fighter={fighter}
          ref={(el) => {
            if (el) sectionRefs.current[index + 1] = el
          }}
          audioRef={(el) => {
            if (el) audioRefs.current[index] = el
          }}
          isActive={activeSection === index + 1}
        />
      ))}

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 bg-black bg-opacity-70 p-3 rounded-full hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-red-600"
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
      >
        {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
      </button>

      <Footer />
    </main>
  )
}

export default HomePage;