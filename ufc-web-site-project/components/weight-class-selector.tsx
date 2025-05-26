"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface WeightClassSelectorProps {
  weightClasses: string[]
  activeClass: string
  onSelectClass: (weightClass: string) => void
}

export default function WeightClassSelector({ weightClasses, activeClass, onSelectClass }: WeightClassSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectorRef = useRef<HTMLDivElement>(null)

  const toggleSelector = () => {
    setIsOpen(!isOpen)
  }

  const handleSelectClass = (weightClass: string) => {
    onSelectClass(weightClass)
    setIsOpen(false)
  }

  // Close selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={selectorRef} className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40">
      {/* Selector Button */}
      <button
        onClick={toggleSelector}
        className="flex items-center bg-red-600 bg-opacity-80 text-white px-4 py-3 rounded-l-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="font-medium mr-2">{activeClass}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 top-full mt-2 bg-white shadow-xl rounded-l-lg overflow-hidden transition-all duration-300 origin-top-right ${
          isOpen ? "opacity-100 scale-y-100 max-h-[80vh] overflow-y-auto" : "opacity-0 scale-y-0 max-h-0"
        }`}
        style={{
          transformOrigin: "top right",
          width: "200px",
        }}
      >
        <div className="py-1">
          {weightClasses.map((weightClass) => (
            <button
              key={weightClass}
              onClick={() => handleSelectClass(weightClass)}
              className={`w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors ${
                activeClass === weightClass ? "bg-red-50 text-red-600 font-medium" : "text-gray-800"
              }`}
            >
              {weightClass}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
