import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FighterCompareContent from "@/components/fighter-compare-content"

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <FighterCompareContent />
      <Footer />
    </main>
  )
}
