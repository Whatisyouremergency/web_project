import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">UFC</h3>
            <p className="text-gray-400 text-sm">
              Ultimate Fighting Championship® is the world's leading mixed martial arts organization.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white text-sm">
                  About UFC
                </a>
              </li>
              <li>
                <a href="/careers" className="text-gray-400 hover:text-white text-sm">
                  Careers
                </a>
              </li>
              <li>
                <a href="/press" className="text-gray-400 hover:text-white text-sm">
                  Press
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com/ufc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com/ufc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com/ufc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://youtube.com/ufc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Youtube className="w-5 h-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-4">© {new Date().getFullYear()} UFC. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
