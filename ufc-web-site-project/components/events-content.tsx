"use client"

import { useRouter } from "next/navigation"
import { events } from "@/data/events"
import { Calendar, MapPin } from "lucide-react"

export default function EventsContent() {
  const router = useRouter()

  const handleEventClick = (eventId: string) => {
    router.push(`/events/${eventId}`)
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">UFC Events</h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => handleEventClick(event.id)}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {event.series}
                  </span>
                  <span className="text-gray-500 text-sm">#{event.number}</span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold group-hover:text-red-600 transition-colors mb-2">
                  {event.name}
                </h2>

                <div className="flex items-center gap-4 text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm text-gray-500 mb-2">Main Event</p>
                  <p className="font-medium">
                    {event.mainEvent.fighter1} vs {event.mainEvent.fighter2}
                  </p>
                  <p className="text-sm text-gray-600">{event.mainEvent.title}</p>
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:ml-6">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      event.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : event.status === "upcoming"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {event.status === "completed" ? "Completed" : event.status === "upcoming" ? "Upcoming" : "Live"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
