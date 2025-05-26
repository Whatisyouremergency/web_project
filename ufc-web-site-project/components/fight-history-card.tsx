"use client"

import Image from "next/image"

interface FightHistory {
  opponent: {
    name: string
    image: string
  }
  result: "win" | "loss" | "draw"
  method: string
  round: number
  time: string
  date: string
  event: string
}

interface FightHistoryCardProps {
  fight: FightHistory
  fighterName: string
}

export default function FightHistoryCard({ fight, fighterName }: FightHistoryCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        {/* Fighter (Left) */}
        <div className="flex items-center flex-1">
          <div className="relative w-16 h-16 mr-4">
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt={fighterName}
              fill
              className="object-cover rounded-full"
            />
            {fight.result === "win" && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">W</span>
              </div>
            )}
            {fight.result === "loss" && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">L</span>
              </div>
            )}
          </div>
          <div>
            <h3
              className={`font-bold ${fight.result === "win" ? "text-green-600" : fight.result === "loss" ? "text-red-600" : "text-gray-800"}`}
            >
              {fighterName}
            </h3>
          </div>
        </div>

        {/* VS and Fight Details */}
        <div className="flex-1 text-center px-4">
          <div className="text-lg font-bold text-gray-400 mb-1">VS</div>
          <div className="text-sm text-gray-600">
            <div className="font-medium">{fight.method}</div>
            <div>
              Round {fight.round} • {fight.time}
            </div>
          </div>
        </div>

        {/* Opponent (Right) */}
        <div className="flex items-center flex-1 justify-end">
          <div className="text-right mr-4">
            <h3
              className={`font-bold ${fight.result === "loss" ? "text-green-600" : fight.result === "win" ? "text-red-600" : "text-gray-800"}`}
            >
              {fight.opponent.name}
            </h3>
          </div>
          <div className="relative w-16 h-16">
            <Image
              src={fight.opponent.image || "/placeholder.svg?height=200&width=200"}
              alt={fight.opponent.name}
              fill
              className="object-cover rounded-full"
            />
            {fight.result === "loss" && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">W</span>
              </div>
            )}
            {fight.result === "win" && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">L</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Info */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-sm text-gray-600">
          <span>{fight.event}</span>
          <span>{fight.date}</span>
        </div>
      </div>
    </div>
  )
}
