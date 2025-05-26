import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import EventsContent from "@/components/events-content"

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <EventsContent />
      <Footer />
    </main>
  )
}
