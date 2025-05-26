"use client"

import { useEffect, useState } from "react"
import { events } from "@/data/events"
import GoogleMapComponent from "./google-map-component"
import FightCard from "./fight-card"

interface EventDetailsContentProps {
  eventId: string
}

export default function EventDetailsContent({ eventId }: EventDetailsContentProps) {
  const [event, setEvent] = useState<any>(null)

  useEffect(() => {
    const foundEvent = events.find((e) => e.id === eventId)
    setEvent(foundEvent)
  }, [eventId])

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Event not found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Event Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.name}</h1>
          <p className="text-xl text-gray-600">
            {event.date} • {event.location}
          </p>
        </div>

        {/* Google Map */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Event Location</h2>
          <div className="h-96 rounded-lg overflow-hidden shadow-lg">
            <GoogleMapComponent location={event.coordinates} eventLocation={event.location} eventName={event.name} />
          </div>
        </div>

        {/* Fight Card */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Fight Card</h2>
          <div className="space-y-4">
            {event.fights.map((fight: any, index: number) => (
              <FightCard key={index} fight={fight} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
