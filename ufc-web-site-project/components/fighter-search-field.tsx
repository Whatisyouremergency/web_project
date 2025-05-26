"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { getAllFighters } from "@/data/all-fighters"
import { Search } from "lucide-react"

interface FighterSearchFieldProps {
  placeholder: string
  onFighterSelect: (fighter: any) => void
  selectedFighter: any
}

export default function FighterSearchField({ placeholder, onFighterSelect, selectedFighter }: FighterSearchFieldProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredFighters, setFilteredFighters] = useState<any[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const allFighters = useRef(getAllFighters())

  // Handle search term changes
  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = allFighters.current.filter((fighter) =>
        fighter.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredFighters(filtered.slice(0, 5)) // Show max 5 results
      setShowDropdown(true)
    } else {
      setFilteredFighters([])
      setShowDropdown(false)
    }
  }, [searchTerm])

  // Handle selected fighter changes
  useEffect(() => {
    if (selectedFighter && selectedFighter.name !== searchTerm) {
      setSearchTerm(selectedFighter.name)
      setShowDropdown(false)
    }
  }, [selectedFighter]) // Only depend on fighter ID to prevent infinite loops

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleFighterSelect = useCallback(
    (fighter: any) => {
      onFighterSelect(fighter)
      setSearchTerm(fighter.name)
      setShowDropdown(false)
    },
    [onFighterSelect],
  )

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
        />
      </div>

      {showDropdown && filteredFighters.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredFighters.map((fighter) => (
            <div
              key={fighter.id}
              onClick={() => handleFighterSelect(fighter)}
              className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={fighter.image || "/placeholder.svg"}
                alt={fighter.name}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <p className="font-medium">{fighter.name}</p>
                <p className="text-sm text-gray-600">
                  {fighter.weightClass} • {fighter.rank === 0 ? "Champion" : `#${fighter.rank}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
