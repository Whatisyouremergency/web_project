"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { weightClasses } from "@/data/rankings"
import WeightClassSelector from "./weight-class-selector"

export default function RankingsContent() {
  const [activeClass, setActiveClass] = useState("Heavyweight")
  const router = useRouter()

  const handleFighterClick = (fighterId: number) => {
    router.push(`/fighters/${fighterId}`)
  }

  return (
    <div className="container mx-auto px-4 py-24 relative">
      {/* Weight Class Selector */}
      <WeightClassSelector
        weightClasses={Object.keys(weightClasses)}
        activeClass={activeClass}
        onSelectClass={setActiveClass}
      />

      {/* Rankings List */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-600 text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-bold">{activeClass} Division</h2>
        </div>

        {/* Champion */}
        <div className="bg-gradient-to-r from-gray-200 to-white p-6 mb-4">
          <div
            onClick={() => handleFighterClick(weightClasses[activeClass][0].id)}
            className="flex items-center group transition-all duration-300 hover:scale-105 hover:bg-gray-100 p-4 rounded-lg cursor-pointer"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mr-6">
              <span className="text-lg font-bold">C</span>
            </div>

            <div className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-full border-2 border-red-600 mr-6 group-hover:shadow-lg">
              <Image
                src={weightClasses[activeClass][0].image || "/placeholder.svg"}
                alt={weightClasses[activeClass][0].name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold group-hover:text-red-600 transition-colors">
                {weightClasses[activeClass][0].name}
              </h3>
              <p className="text-gray-600">Record: {weightClasses[activeClass][0].record}</p>
            </div>
          </div>
        </div>

        {/* Contenders */}
        <div className="bg-white shadow-sm rounded-b-lg overflow-hidden">
          {weightClasses[activeClass].slice(1).map((fighter, index) => (
            <div
              key={fighter.id}
              onClick={() => handleFighterClick(fighter.id)}
              className="border-b border-gray-100 last:border-0 group transition-all duration-300 hover:scale-105 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center p-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-200 text-gray-800 rounded-full mr-6 group-hover:bg-gray-300 transition-colors">
                  <span className="text-lg font-bold">{index + 1}</span>
                </div>

                <div className="relative w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-full mr-6 group-hover:shadow-md">
                  <Image src={fighter.image || "/placeholder.svg"} alt={fighter.name} fill className="object-cover" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-medium group-hover:text-red-600 transition-colors">
                    {fighter.name}
                  </h3>
                  <p className="text-gray-600 text-sm">Record: {fighter.record}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
