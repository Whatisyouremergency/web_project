import type { Fighter } from "@/types/fighter"
import { fighters } from "./fighters"

// Extended fighter data for rankings
interface RankedFighter extends Fighter {
  rank?: number
}

// Create sample fighters for each weight class
const createSampleFighters = (weightClass: string, count: number): RankedFighter[] => {
  const champion = {
    ...(fighters.find((f) => f.weightClass === weightClass) || {
      id: Math.random(),
      name: `${weightClass} Champion`,
      nickname: "The Best",
      weightClass,
      image: "/fighters/placeholder.png",
      highlightVideo: "/videos/placeholder.mp4",
      themeMusic: "/music/placeholder.mp3",
      record: "20-0-0",
      knockouts: 10,
      submissions: 5,
    }),
  }

  const contenders: RankedFighter[] = []

  for (let i = 1; i <= count; i++) {
    contenders.push({
      id: Math.random(),
      name: `${weightClass} Contender ${i}`,
      nickname: `The Challenger ${i}`,
      weightClass,
      image: `/placeholder.svg?height=200&width=200`,
      highlightVideo: "/videos/placeholder.mp4",
      themeMusic: "/music/placeholder.mp3",
      record: `${20 - i}-${i}-0`,
      knockouts: 10 - Math.floor(i / 2),
      submissions: 5 - Math.floor(i / 3),
      rank: i,
    })
  }

  return [champion, ...contenders]
}

// Create weight classes with their respective fighters
export const weightClasses: Record<string, RankedFighter[]> = {
  Heavyweight: [
    {
      id: 5,
      name: "Jon Jones",
      nickname: "Bones",
      weightClass: "Heavyweight",
      image: "/fighters/jones.jpg",
      highlightVideo: "/videos/jones-highlights.mp4",
      themeMusic: "/music/jones-theme.mp3",
      record: "27-1-0",
      knockouts: 10,
      submissions: 7,
    },
    ...createSampleFighters("Heavyweight", 10).slice(1),
  ],
  "Light Heavyweight": [
    {
      id: 4,
      name: "Alex Pereira",
      nickname: "Poatan",
      weightClass: "Light Heavyweight",
      image: "/fighters/pereira.jpg",
      highlightVideo: "/videos/pereira-highlights.mp4",
      themeMusic: "/music/pereira-theme.mp3",
      record: "9-2-0",
      knockouts: 7,
      submissions: 0,
    },
    ...createSampleFighters("Light Heavyweight", 10).slice(1),
  ],
  Middleweight: createSampleFighters("Middleweight", 10),
  Welterweight: [
    {
      id: 3,
      name: "Leon Edwards",
      nickname: "Rocky",
      weightClass: "Welterweight",
      image: "/fighters/edwards.jpg",
      highlightVideo: "/videos/edwards-highlights.mp4",
      themeMusic: "/music/edwards-theme.mp3",
      record: "21-3-0",
      knockouts: 7,
      submissions: 3,
    },
    ...createSampleFighters("Welterweight", 10).slice(1),
  ],
  Lightweight: [
    {
      id: 2,
      name: "Islam Makhachev",
      nickname: "The Eagle's Heir",
      weightClass: "Lightweight",
      image: "/fighters/makhachev.jpg",
      highlightVideo: "/videos/makhachev-highlights.mp4",
      themeMusic: "/music/makhachev-theme.mp3",
      record: "24-1-0",
      knockouts: 4,
      submissions: 11,
    },
    ...createSampleFighters("Lightweight", 10).slice(1),
  ],
  Featherweight: [
    {
      id: 1,
      name: "Alexander Volkanovski",
      nickname: "The Great",
      weightClass: "Featherweight",
      image: "/fighters/volkanovski.jpg",
      highlightVideo: "/videos/volkanovski-highlights.mp4",
      themeMusic: "/music/volkanovski-theme.mp3",
      record: "25-3-0",
      knockouts: 13,
      submissions: 3,
    },
    ...createSampleFighters("Featherweight", 10).slice(1),
  ],
  Bantamweight: createSampleFighters("Bantamweight", 10),
  Flyweight: createSampleFighters("Flyweight", 10),
  "Women's Featherweight": createSampleFighters("Women's Featherweight", 10),
  "Women's Bantamweight": createSampleFighters("Women's Bantamweight", 10),
  "Women's Flyweight": createSampleFighters("Women's Flyweight", 10),
  "Women's Strawweight": createSampleFighters("Women's Strawweight", 10),
}
