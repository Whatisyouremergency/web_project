"use client"

import { useEffect, useRef } from "react"

interface FighterRadarChartProps {
  stats: {
    striking: number
    grappling: number
    cardio: number
    power: number
    speed: number
    defense: number
  }
}

export default function FighterRadarChart({ stats }: FighterRadarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = svgRef.current
    const width = 400
    const height = 400
    const centerX = width / 2
    const centerY = height / 2
    const radius = 150

    // Clear previous content
    svg.innerHTML = ""

    // Set SVG dimensions
    svg.setAttribute("width", width.toString())
    svg.setAttribute("height", height.toString())
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`)

    // Stats data
    const attributes = [
      { name: "Striking", value: stats.striking, angle: 0 },
      { name: "Grappling", value: stats.grappling, angle: 60 },
      { name: "Cardio", value: stats.cardio, angle: 120 },
      { name: "Power", value: stats.power, angle: 180 },
      { name: "Speed", value: stats.speed, angle: 240 },
      { name: "Defense", value: stats.defense, angle: 300 },
    ]

    // Create background grid (hexagonal web)
    const createGridLevel = (level: number, opacity: number) => {
      const points = attributes.map((attr) => {
        const angle = (attr.angle * Math.PI) / 180
        const r = (radius * level) / 5
        const x = centerX + r * Math.cos(angle - Math.PI / 2)
        const y = centerY + r * Math.sin(angle - Math.PI / 2)
        return `${x},${y}`
      })

      const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
      polygon.setAttribute("points", points.join(" "))
      polygon.setAttribute("fill", "none")
      polygon.setAttribute("stroke", "#e5e7eb")
      polygon.setAttribute("stroke-width", "1")
      polygon.setAttribute("opacity", opacity.toString())
      svg.appendChild(polygon)
    }

    // Create grid levels (5 levels)
    for (let i = 1; i <= 5; i++) {
      createGridLevel(i, 0.3 + i * 0.1)
    }

    // Create axis lines
    attributes.forEach((attr) => {
      const angle = (attr.angle * Math.PI) / 180
      const x = centerX + radius * Math.cos(angle - Math.PI / 2)
      const y = centerY + radius * Math.sin(angle - Math.PI / 2)

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
      line.setAttribute("x1", centerX.toString())
      line.setAttribute("y1", centerY.toString())
      line.setAttribute("x2", x.toString())
      line.setAttribute("y2", y.toString())
      line.setAttribute("stroke", "#d1d5db")
      line.setAttribute("stroke-width", "1")
      svg.appendChild(line)
    })

    // Create data polygon
    const dataPoints = attributes.map((attr) => {
      const angle = (attr.angle * Math.PI) / 180
      const r = (radius * attr.value) / 100
      const x = centerX + r * Math.cos(angle - Math.PI / 2)
      const y = centerY + r * Math.sin(angle - Math.PI / 2)
      return `${x},${y}`
    })

    const dataPolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
    dataPolygon.setAttribute("points", dataPoints.join(" "))
    dataPolygon.setAttribute("fill", "#dc2626")
    dataPolygon.setAttribute("fill-opacity", "0.3")
    dataPolygon.setAttribute("stroke", "#dc2626")
    dataPolygon.setAttribute("stroke-width", "2")
    svg.appendChild(dataPolygon)

    // Create data points
    attributes.forEach((attr) => {
      const angle = (attr.angle * Math.PI) / 180
      const r = (radius * attr.value) / 100
      const x = centerX + r * Math.cos(angle - Math.PI / 2)
      const y = centerY + r * Math.sin(angle - Math.PI / 2)

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      circle.setAttribute("cx", x.toString())
      circle.setAttribute("cy", y.toString())
      circle.setAttribute("r", "4")
      circle.setAttribute("fill", "#dc2626")
      circle.setAttribute("stroke", "#ffffff")
      circle.setAttribute("stroke-width", "2")
      svg.appendChild(circle)
    })

    // Create labels
    attributes.forEach((attr) => {
      const angle = (attr.angle * Math.PI) / 180
      const labelRadius = radius + 30
      const x = centerX + labelRadius * Math.cos(angle - Math.PI / 2)
      const y = centerY + labelRadius * Math.sin(angle - Math.PI / 2)

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
      text.setAttribute("x", x.toString())
      text.setAttribute("y", y.toString())
      text.setAttribute("text-anchor", "middle")
      text.setAttribute("dominant-baseline", "middle")
      text.setAttribute("font-family", "Arial, sans-serif")
      text.setAttribute("font-size", "12")
      text.setAttribute("font-weight", "bold")
      text.setAttribute("fill", "#374151")
      text.textContent = attr.name

      // Add value below the label
      const valueText = document.createElementNS("http://www.w3.org/2000/svg", "text")
      valueText.setAttribute("x", x.toString())
      valueText.setAttribute("y", (y + 15).toString())
      valueText.setAttribute("text-anchor", "middle")
      valueText.setAttribute("dominant-baseline", "middle")
      valueText.setAttribute("font-family", "Arial, sans-serif")
      valueText.setAttribute("font-size", "10")
      valueText.setAttribute("fill", "#dc2626")
      valueText.setAttribute("font-weight", "bold")
      valueText.textContent = attr.value.toString()

      svg.appendChild(text)
      svg.appendChild(valueText)
    })

    // Create center labels for scale
    for (let i = 1; i <= 5; i++) {
      const value = (i * 20).toString()
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
      text.setAttribute("x", (centerX + 5).toString())
      text.setAttribute("y", (centerY - (radius * i) / 5 + 3).toString())
      text.setAttribute("font-family", "Arial, sans-serif")
      text.setAttribute("font-size", "10")
      text.setAttribute("fill", "#9ca3af")
      text.textContent = value
      svg.appendChild(text)
    }
  }, [stats])

  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-lg font-bold mb-4 text-center">Fighter Attributes (0-100 Scale)</h3>
      <div className="flex justify-center">
        <svg ref={svgRef} className="max-w-full h-auto" />
      </div>
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>Each attribute is rated on a scale of 0-100</p>
      </div>
    </div>
  )
}
