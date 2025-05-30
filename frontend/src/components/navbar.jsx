import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import logo from "@/assets/ufc-logo.png" // 경로는 프로젝트 구조에 맞게 조정

export default function Navbar() {
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    navigate(path)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <div className="relative w-12 h-12">
              <img
                src={logo}
                alt="UFC Logo"
                className="object-contain w-full h-full filter brightness-0 invert"
              />
            </div>
          </Link>

          <nav className="flex items-center space-x-8">
            <button
              onClick={() => handleNavigation("/rankings")}
              className="text-white hover:text-red-600 transition-colors font-medium bg-transparent border-none cursor-pointer"
            >
              Rankings
            </button>
            <button
              onClick={() => handleNavigation("/events")}
              className="text-white hover:text-red-600 transition-colors font-medium bg-transparent border-none cursor-pointer"
            >
              Events
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
