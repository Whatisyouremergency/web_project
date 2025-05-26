"use client"

import { forwardRef, useRef, useEffect } from "react"
import Image from "next/image"
import type { Fighter } from "@/types/fighter"

interface FighterSectionProps {
  fighter: Fighter
  isActive: boolean
  audioRef: (el: HTMLAudioElement | null) => void
}

const FighterSection = forwardRef<HTMLDivElement, FighterSectionProps>(({ fighter, isActive, audioRef }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return

    if (isActive) {
      videoRef.current.play().catch((e) => console.log("Video play failed:", e))
    } else {
      videoRef.current.pause()
    }
  }, [isActive])

  return (
    <section
      ref={ref}
      className="h-screen relative flex flex-col items-center justify-center snap-start overflow-hidden"
    >
      {/* Background Video */}
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-40" loop muted playsInline>
        <source src={fighter.highlightVideo} type="video/mp4" />
      </video>

      {/* Audio */}
      <audio ref={audioRef} loop src={fighter.themeMusic} />

      {/* Fighter Content */}
      <div className="z-10 text-center">
        <p className="text-gray-300 text-lg mb-4 uppercase tracking-widest">"{fighter.nickname}"</p>

        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-6">
          <Image
            src={fighter.image || "/placeholder.svg"}
            alt={fighter.name}
            fill
            className="object-cover rounded-full"
          />
        </div>

        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">{fighter.name}</h2>

        <p className="mt-2 text-xl text-red-600 font-semibold">{fighter.weightClass} Champion</p>

        <div className="mt-6 flex justify-center space-x-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">RECORD</p>
            <p className="text-2xl font-bold">{fighter.record}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">KO/TKO</p>
            <p className="text-2xl font-bold">{fighter.knockouts}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">SUBMISSIONS</p>
            <p className="text-2xl font-bold">{fighter.submissions}</p>
          </div>
        </div>
      </div>
    </section>
  )
})

FighterSection.displayName = "FighterSection"

export default FighterSection
