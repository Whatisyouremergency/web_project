import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FighterProfileContent from "@/components/fighter-profile-content"

interface FighterPageProps {
  params: {
    fighterId: string
  }
}

export default function FighterPage({ params }: FighterPageProps) {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <FighterProfileContent fighterId={params.fighterId} />
      <Footer />
    </main>
  )
}
