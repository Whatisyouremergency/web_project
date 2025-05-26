import type { Fighter } from "@/types/fighter"
import { weightClasses } from "./rankings"

interface ExtendedFighter extends Fighter {
  rank?: number
  height: string
  reach: string
  age: number
  fightingStyle: string
  stats: {
    striking: number
    grappling: number
    cardio: number
    power: number
    speed: number
    defense: number
  }
  fightHistory: Array<{
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
  }>
}

// Extended fighter data with additional information
const extendedFighterData: Record<number, Partial<ExtendedFighter>> = {
  1: {
    // Alexander Volkanovski
    height: "5'6\"",
    reach: '71.5"',
    age: 35,
    fightingStyle: "Boxing/Wrestling",
    stats: {
      striking: 92,
      grappling: 85,
      cardio: 95,
      power: 88,
      speed: 90,
      defense: 93,
    },
    fightHistory: [
      {
        opponent: { name: "Ilia Topuria", image: "/placeholder.svg?height=200&width=200" },
        result: "loss",
        method: "KO (Punch)",
        round: 2,
        time: "3:32",
        date: "Feb 17, 2024",
        event: "UFC 298",
      },
      {
        opponent: { name: "Islam Makhachev", image: "/fighters/makhachev.jpg" },
        result: "loss",
        method: "Decision (Unanimous)",
        round: 5,
        time: "5:00",
        date: "Oct 21, 2023",
        event: "UFC 294",
      },
      {
        opponent: { name: "Yair Rodriguez", image: "/placeholder.svg?height=200&width=200" },
        result: "win",
        method: "TKO (Punches)",
        round: 3,
        time: "4:19",
        date: "Jul 8, 2023",
        event: "UFC 290",
      },
    ],
  },
  2: {
    // Islam Makhachev
    height: "5'10\"",
    reach: '70"',
    age: 32,
    fightingStyle: "Sambo/Wrestling",
    stats: {
      striking: 85,
      grappling: 98,
      cardio: 92,
      power: 82,
      speed: 87,
      defense: 90,
    },
    fightHistory: [
      {
        opponent: { name: "Alexander Volkanovski", image: "/fighters/volkanovski.jpg" },
        result: "win",
        method: "Decision (Unanimous)",
        round: 5,
        time: "5:00",
        date: "Oct 21, 2023",
        event: "UFC 294",
      },
      {
        opponent: { name: "Charles Oliveira", image: "/placeholder.svg?height=200&width=200" },
        result: "win",
        method: "Submission (Arm Triangle)",
        round: 2,
        time: "3:16",
        date: "Oct 22, 2022",
        event: "UFC 280",
      },
    ],
  },
  3: {
    // Leon Edwards
    height: "6'0\"",
    reach: '74"',
    age: 32,
    fightingStyle: "Kickboxing/BJJ",
    stats: {
      striking: 90,
      grappling: 82,
      cardio: 88,
      power: 85,
      speed: 89,
      defense: 91,
    },
    fightHistory: [
      {
        opponent: { name: "Colby Covington", image: "/placeholder.svg?height=200&width=200" },
        result: "win",
        method: "Decision (Unanimous)",
        round: 5,
        time: "5:00",
        date: "Dec 16, 2023",
        event: "UFC 296",
      },
      {
        opponent: { name: "Kamaru Usman", image: "/placeholder.svg?height=200&width=200" },
        result: "win",
        method: "KO (Head Kick)",
        round: 5,
        time: "4:04",
        date: "Aug 20, 2022",
        event: "UFC 278",
      },
    ],
  },
  4: {
    // Alex Pereira
    height: "6'4\"",
    reach: '79"',
    age: 36,
    fightingStyle: "Kickboxing",
    stats: {
      striking: 98,
      grappling: 70,
      cardio: 85,
      power: 95,
      speed: 82,
      defense: 88,
    },
    fightHistory: [
      {
        opponent: { name: "Jamahal Hill", image: "/placeholder.svg?height=200&width=200" },
        result: "win",
        method: "TKO (Punches)",
        round: 1,
        time: "3:19",
        date: "Apr 13, 2024",
        event: "UFC 300",
      },
      {
        opponent: { name: "Jiri Prochazka", image: "/placeholder.svg?height=200&width=200" },
        result: "win",
        method: "TKO (Punches)",
        round: 2,
        time: "4:08",
        date: "Jul 29, 2023",
        event: "UFC 295",
      },
    ],
  },
  5: {
    // Jon Jones
    height: "6'4\"",
    reach: '84.5"',
    age: 37,
    fightingStyle: "MMA/Wrestling",
    stats: {
      striking: 88,
      grappling: 95,
      cardio: 90,
      power: 92,
      speed: 85,
      defense: 96,
    },
    fightHistory: [
      {
        opponent: { name: "Ciryl Gane", image: "/placeholder.svg?height=200&width=200" },
        result: "win",
        method: "Submission (Guillotine Choke)",
        round: 1,
        time: "2:04",
        date: "Mar 4, 2023",
        event: "UFC 285",
      },
      {
        opponent: { name: "Dominick Reyes", image: "/placeholder.svg?height=200&width=200" },
        result: "win",
        method: "Decision (Unanimous)",
        round: 5,
        time: "5:00",
        date: "Feb 8, 2020",
        event: "UFC 247",
      },
    ],
  },
}

export function getAllFighters(): ExtendedFighter[] {
  const allFighters: ExtendedFighter[] = []

  // Add champions and contenders from all weight classes
  Object.entries(weightClasses).forEach(([weightClass, fighters]) => {
    fighters.forEach((fighter, index) => {
      const extendedData = extendedFighterData[fighter.id] || {}
      const extendedFighter: ExtendedFighter = {
        ...fighter,
        rank: index === 0 ? 0 : index, // 0 for champion, 1-10 for contenders
        height: extendedData.height || "6'0\"",
        reach: extendedData.reach || '72"',
        age: extendedData.age || 30,
        fightingStyle: extendedData.fightingStyle || "Mixed Martial Arts",
        stats: extendedData.stats || {
          striking: 80,
          grappling: 80,
          cardio: 80,
          power: 80,
          speed: 80,
          defense: 80,
        },
        fightHistory: extendedData.fightHistory || [
          {
            opponent: { name: "Sample Opponent", image: "/placeholder.svg?height=200&width=200" },
            result: "win",
            method: "Decision (Unanimous)",
            round: 3,
            time: "5:00",
            date: "Jan 1, 2024",
            event: "UFC Sample",
          },
        ],
      }
      allFighters.push(extendedFighter)
    })
  })

  return allFighters
}
