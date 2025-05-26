import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import EventDetailsContent from "@/components/event-details-content"

interface EventPageProps {
  params: {
    eventId: string
  }
}

export default function EventPage({ params }: EventPageProps) {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <EventDetailsContent eventId={params.eventId} />
      <Footer />
    </main>
  )
}
