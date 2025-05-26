"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { getAllFighters } from "@/data/all-fighters"
import FighterRadarChart from "./fighter-radar-chart"
import FightHistoryCard from "./fight-history-card"
import { Calendar, Ruler, Users } from "lucide-react"

interface FighterProfileContentProps {
  fighterId: string
}

export default function FighterProfileContent({ fighterId }: FighterProfileContentProps) {
  const [fighter, setFighter] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const allFighters = getAllFighters()
    const foundFighter = allFighters.find((f) => f.id.toString() === fighterId)
    setFighter(foundFighter)
  }, [fighterId])

  const handleCompareClick = () => {
    router.push(`/compare?fighter1=${fighterId}`)
  }

  if (!fighter) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Fighter not found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Fighter Header */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Fighter Photo */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-80 h-80 rounded-lg overflow-hidden shadow-lg">
              <Image src={fighter.image || "/placeholder.svg"} alt={fighter.name} fill className="object-cover" />
            </div>
          </div>

          {/* Compare Button */}
          <div className="flex justify-center lg:justify-start lg:items-start lg:pt-4">
            <button
              onClick={handleCompareClick}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-lg"
            >
              <Users className="w-5 h-5" />
              Compare Fighter
            </button>
          </div>

          {/* Fighter Info */}
          <div className="flex flex-col justify-center flex-1">
            <div className="mb-6">
              <p className="text-gray-500 text-lg mb-2">"{fighter.nickname}"</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{fighter.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
                  {fighter.weightClass} Division
                </span>
                {fighter.rank === 0 && (
                  <span className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium">Champion</span>
                )}
                {fighter.rank > 0 && (
                  <span className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium">#{fighter.rank}</span>
                )}
              </div>
              <p className="text-2xl font-bold text-green-600 mb-4">Record: {fighter.record}</p>
            </div>
          </div>
        </div>

        {/* Physical Stats */}
        <div className="mb-12">
          <div className="grid grid-cols-3 gap-4 bg-gray-50 p-6 rounded-lg max-w-md">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Ruler className="w-5 h-5 text-gray-600 mr-1" />
                <span className="text-sm text-gray-600">Height</span>
              </div>
              <p className="text-xl font-bold">{fighter.height}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Ruler className="w-5 h-5 text-gray-600 mr-1" />
                <span className="text-sm text-gray-600">Reach</span>
              </div>
              <p className="text-xl font-bold">{fighter.reach}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-5 h-5 text-gray-600 mr-1" />
                <span className="text-sm text-gray-600">Age</span>
              </div>
              <p className="text-xl font-bold">{fighter.age}</p>
            </div>
          </div>
        </div>

        {/* Fighter Statistics Radar Chart */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Fighter Statistics</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <FighterRadarChart stats={fighter.stats} />
          </div>
        </div>

        {/* Fight History */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Fight History</h2>
          <div className="space-y-4">
            {fighter.fightHistory.map((fight: any, index: number) => (
              <FightHistoryCard key={index} fight={fight} fighterName={fighter.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
