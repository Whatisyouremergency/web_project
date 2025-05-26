"use client"

import Image from "next/image"

interface Fight {
  fighter1: {
    name: string
    image: string
    result: "win" | "loss" | "draw"
  }
  fighter2: {
    name: string
    image: string
    result: "win" | "loss" | "draw"
  }
  method: string
  round: number
  time: string
  title?: string
}

interface FightCardProps {
  fight: Fight
}

export default function FightCard({ fight }: FightCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      {fight.title && (
        <div className="text-center mb-4">
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">{fight.title}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        {/* Fighter 1 */}
        <div className="flex-1 text-center">
          <div className="relative w-20 h-20 mx-auto mb-3">
            <Image
              src={fight.fighter1.image || "/placeholder.svg"}
              alt={fight.fighter1.name}
              fill
              className="object-cover rounded-full"
            />
            {fight.fighter1.result === "win" && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">W</span>
              </div>
            )}
            {fight.fighter1.result === "loss" && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">L</span>
              </div>
            )}
          </div>
          <h3
            className={`font-bold ${fight.fighter1.result === "win" ? "text-green-600" : fight.fighter1.result === "loss" ? "text-red-600" : "text-gray-800"}`}
          >
            {fight.fighter1.name}
          </h3>
        </div>

        {/* VS and Result */}
        <div className="flex-1 text-center px-4">
          <div className="text-2xl font-bold text-gray-400 mb-2">VS</div>
          <div className="text-sm text-gray-600">
            <div className="font-medium">{fight.method}</div>
            <div>
              Round {fight.round} • {fight.time}
            </div>
          </div>
        </div>

        {/* Fighter 2 */}
        <div className="flex-1 text-center">
          <div className="relative w-20 h-20 mx-auto mb-3">
            <Image
              src={fight.fighter2.image || "/placeholder.svg"}
              alt={fight.fighter2.name}
              fill
              className="object-cover rounded-full"
            />
            {fight.fighter2.result === "win" && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">W</span>
              </div>
            )}
            {fight.fighter2.result === "loss" && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">L</span>
              </div>
            )}
          </div>
          <h3
            className={`font-bold ${fight.fighter2.result === "win" ? "text-green-600" : fight.fighter2.result === "loss" ? "text-red-600" : "text-gray-800"}`}
          >
            {fight.fighter2.name}
          </h3>
        </div>
      </div>
    </div>
  )
}
