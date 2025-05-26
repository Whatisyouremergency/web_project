"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { getAllFighters } from "@/data/all-fighters"
import FighterSearchField from "./fighter-search-field"
import ComparisonRadarChart from "./comparison-radar-chart"

export default function FighterCompareContent() {
  const searchParams = useSearchParams()
  const [fighter1, setFighter1] = useState<any>(null)
  const [fighter2, setFighter2] = useState<any>(null)
  const [showComparison, setShowComparison] = useState(false)
  const [winProbability, setWinProbability] = useState({ fighter1: 50, fighter2: 50 })

  useEffect(() => {
    const fighter1Id = searchParams.get("fighter1")
    if (fighter1Id && !fighter1) {
      const allFighters = getAllFighters()
      const foundFighter = allFighters.find((f) => f.id.toString() === fighter1Id)
      if (foundFighter) {
        setFighter1(foundFighter)
      }
    }
  }, [searchParams, fighter1])

  const calculateWinProbability = useCallback((f1: any, f2: any) => {
    if (!f1 || !f2) return { fighter1: 50, fighter2: 50 }

    // Simple algorithm based on stats, ranking, and record
    const f1Score =
      (f1.stats.striking + f1.stats.grappling + f1.stats.cardio + f1.stats.power + f1.stats.speed + f1.stats.defense) /
        6 +
      (f1.rank === 0 ? 10 : Math.max(0, 10 - f1.rank)) +
      (Number.parseInt(f1.record.split("-")[0]) /
        (Number.parseInt(f1.record.split("-")[0]) + Number.parseInt(f1.record.split("-")[1]))) *
        10

    const f2Score =
      (f2.stats.striking + f2.stats.grappling + f2.stats.cardio + f2.stats.power + f2.stats.speed + f2.stats.defense) /
        6 +
      (f2.rank === 0 ? 10 : Math.max(0, 10 - f2.rank)) +
      (Number.parseInt(f2.record.split("-")[0]) /
        (Number.parseInt(f2.record.split("-")[0]) + Number.parseInt(f2.record.split("-")[1]))) *
        10

    const total = f1Score + f2Score
    const f1Probability = Math.round((f1Score / total) * 100)
    const f2Probability = 100 - f1Probability

    return { fighter1: f1Probability, fighter2: f2Probability }
  }, [])

  const handleStartComparison = useCallback(() => {
    if (fighter1 && fighter2) {
      setShowComparison(true)
      setWinProbability(calculateWinProbability(fighter1, fighter2))
    }
  }, [fighter1, fighter2, calculateWinProbability])

  const generateFightScenario = useCallback(() => {
    if (!fighter1 || !fighter2) return ""

    const f1Strengths = []
    const f2Strengths = []

    // Analyze strengths
    if (fighter1.stats.striking > fighter2.stats.striking) f1Strengths.push("striking advantage")
    else f2Strengths.push("striking advantage")

    if (fighter1.stats.grappling > fighter2.stats.grappling) f1Strengths.push("grappling superiority")
    else f2Strengths.push("grappling superiority")

    if (fighter1.stats.cardio > fighter2.stats.cardio) f1Strengths.push("better cardio")
    else f2Strengths.push("better cardio")

    const winner = winProbability.fighter1 > winProbability.fighter2 ? fighter1 : fighter2
    const loser = winProbability.fighter1 > winProbability.fighter2 ? fighter2 : fighter1

    return `Based on the statistical analysis, ${winner.name} has a ${Math.max(winProbability.fighter1, winProbability.fighter2)}% chance of victory. 

${winner.name}'s path to victory: With ${winner.fightingStyle} fighting style, ${winner.name} should utilize their ${winner.stats.striking > loser.stats.striking ? "superior striking" : "grappling advantage"} to control the pace. Their ${winner.stats.cardio > 85 ? "excellent" : "good"} cardio will be crucial in later rounds.

${loser.name}'s upset potential: Despite being the underdog, ${loser.name} can win by exploiting their ${loser.stats.power > winner.stats.power ? "power advantage" : "technical skills"}. An early finish would be their best strategy before ${winner.name}'s superior conditioning takes over.

Most likely scenario: Expect a ${winner.stats.striking > winner.stats.grappling ? "striking battle" : "grappling-heavy fight"} with ${winner.name} winning by ${winner.stats.power > 90 ? "TKO/KO" : "decision"} in the later rounds.`
  }, [fighter1, fighter2, winProbability])

  const handleFighter1Select = useCallback((fighter: any) => {
    setFighter1(fighter)
  }, [])

  const handleFighter2Select = useCallback((fighter: any) => {
    setFighter2(fighter)
  }, [])

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Fighter Comparison</h1>

        {/* Search Fields */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <div className="flex-1">
            <FighterSearchField
              placeholder="Search Fighter 1"
              onFighterSelect={handleFighter1Select}
              selectedFighter={fighter1}
            />
          </div>

          <button
            onClick={handleStartComparison}
            disabled={!fighter1 || !fighter2}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Start Comparison
          </button>

          <div className="flex-1">
            <FighterSearchField
              placeholder="Search Fighter 2"
              onFighterSelect={handleFighter2Select}
              selectedFighter={fighter2}
            />
          </div>
        </div>

        {showComparison && fighter1 && fighter2 && (
          <div className="space-y-12">
            {/* Fighter Photos and Win Probability */}
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={fighter1.image || "/placeholder.svg"}
                    alt={fighter1.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="font-bold text-lg">{fighter1.name}</h3>
              </div>

              <div className="text-center px-8">
                <div className="bg-gray-100 rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-2">Win Probability</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-red-600">{winProbability.fighter1}%</span>
                    <span className="text-gray-400">VS</span>
                    <span className="text-2xl font-bold text-blue-600">{winProbability.fighter2}%</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={fighter2.image || "/placeholder.svg"}
                    alt={fighter2.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="font-bold text-lg">{fighter2.name}</h3>
              </div>
            </div>

            {/* Fighter Details Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-red-600">{fighter1.name}</h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Weight Class:</span> {fighter1.weightClass}
                  </p>
                  <p>
                    <span className="font-medium">Ranking:</span>{" "}
                    {fighter1.rank === 0 ? "Champion" : `#${fighter1.rank}`}
                  </p>
                  <p>
                    <span className="font-medium">Record:</span> {fighter1.record}
                  </p>
                  <p>
                    <span className="font-medium">Height:</span> {fighter1.height}
                  </p>
                  <p>
                    <span className="font-medium">Reach:</span> {fighter1.reach}
                  </p>
                  <p>
                    <span className="font-medium">Age:</span> {fighter1.age}
                  </p>
                  <p>
                    <span className="font-medium">Fighting Style:</span> {fighter1.fightingStyle}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-600">{fighter2.name}</h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Weight Class:</span> {fighter2.weightClass}
                  </p>
                  <p>
                    <span className="font-medium">Ranking:</span>{" "}
                    {fighter2.rank === 0 ? "Champion" : `#${fighter2.rank}`}
                  </p>
                  <p>
                    <span className="font-medium">Record:</span> {fighter2.record}
                  </p>
                  <p>
                    <span className="font-medium">Height:</span> {fighter2.height}
                  </p>
                  <p>
                    <span className="font-medium">Reach:</span> {fighter2.reach}
                  </p>
                  <p>
                    <span className="font-medium">Age:</span> {fighter2.age}
                  </p>
                  <p>
                    <span className="font-medium">Fighting Style:</span> {fighter2.fightingStyle}
                  </p>
                </div>
              </div>
            </div>

            {/* Combined Radar Chart */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-center">Statistics Comparison</h2>
              <ComparisonRadarChart fighter1Stats={fighter1.stats} fighter2Stats={fighter2.stats} />
            </div>

            {/* Fight Scenario */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Fight Analysis & Prediction</h2>
              <div className="prose max-w-none">
                <p className="whitespace-pre-line text-gray-700 leading-relaxed">{generateFightScenario()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
