import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import RankingsContent from "@/components/rankings-content"

export default function RankingsPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <RankingsContent />
      <Footer />
    </main>
  )
}
