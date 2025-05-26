"use client"

import { useEffect, useRef } from "react"

interface ComparisonRadarChartProps {
  fighter1Stats: {
    striking: number
    grappling: number
    cardio: number
    power: number
    speed: number
    defense: number
  }
  fighter2Stats: {
    striking: number
    grappling: number
    cardio: number
    power: number
    speed: number
    defense: number
  }
}

export default function ComparisonRadarChart({ fighter1Stats, fighter2Stats }: ComparisonRadarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = svgRef.current
    const width = 500
    const height = 500
    const centerX = width / 2
    const centerY = height / 2
    const radius = 180

    // Clear previous content
    svg.innerHTML = ""

    // Set SVG dimensions
    svg.setAttribute("width", width.toString())
    svg.setAttribute("height", height.toString())
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`)

    // Stats data
    const attributes = [
      { name: "Striking", f1: fighter1Stats.striking, f2: fighter2Stats.striking, angle: 0 },
      { name: "Grappling", f1: fighter1Stats.grappling, f2: fighter2Stats.grappling, angle: 60 },
      { name: "Cardio", f1: fighter1Stats.cardio, f2: fighter2Stats.cardio, angle: 120 },
      { name: "Power", f1: fighter1Stats.power, f2: fighter2Stats.power, angle: 180 },
      { name: "Speed", f1: fighter1Stats.speed, f2: fighter2Stats.speed, angle: 240 },
      { name: "Defense", f1: fighter1Stats.defense, f2: fighter2Stats.defense, angle: 300 },
    ]

    // Create background grid
    const createGridLevel = (level: number) => {
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
      svg.appendChild(polygon)
    }

    // Create grid levels
    for (let i = 1; i <= 5; i++) {
      createGridLevel(i)
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

    // Create Fighter 1 polygon (Red)
    const f1Points = attributes.map((attr) => {
      const angle = (attr.angle * Math.PI) / 180
      const r = (radius * attr.f1) / 100
      const x = centerX + r * Math.cos(angle - Math.PI / 2)
      const y = centerY + r * Math.sin(angle - Math.PI / 2)
      return `${x},${y}`
    })

    const f1Polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
    f1Polygon.setAttribute("points", f1Points.join(" "))
    f1Polygon.setAttribute("fill", "#dc2626")
    f1Polygon.setAttribute("fill-opacity", "0.3")
    f1Polygon.setAttribute("stroke", "#dc2626")
    f1Polygon.setAttribute("stroke-width", "2")
    svg.appendChild(f1Polygon)

    // Create Fighter 2 polygon (Blue)
    const f2Points = attributes.map((attr) => {
      const angle = (attr.angle * Math.PI) / 180
      const r = (radius * attr.f2) / 100
      const x = centerX + r * Math.cos(angle - Math.PI / 2)
      const y = centerY + r * Math.sin(angle - Math.PI / 2)
      return `${x},${y}`
    })

    const f2Polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
    f2Polygon.setAttribute("points", f2Points.join(" "))
    f2Polygon.setAttribute("fill", "#2563eb")
    f2Polygon.setAttribute("fill-opacity", "0.3")
    f2Polygon.setAttribute("stroke", "#2563eb")
    f2Polygon.setAttribute("stroke-width", "2")
    svg.appendChild(f2Polygon)

    // Create data points for Fighter 1
    attributes.forEach((attr) => {
      const angle = (attr.angle * Math.PI) / 180
      const r = (radius * attr.f1) / 100
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

    // Create data points for Fighter 2
    attributes.forEach((attr) => {
      const angle = (attr.angle * Math.PI) / 180
      const r = (radius * attr.f2) / 100
      const x = centerX + r * Math.cos(angle - Math.PI / 2)
      const y = centerY + r * Math.sin(angle - Math.PI / 2)

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      circle.setAttribute("cx", x.toString())
      circle.setAttribute("cy", y.toString())
      circle.setAttribute("r", "4")
      circle.setAttribute("fill", "#2563eb")
      circle.setAttribute("stroke", "#ffffff")
      circle.setAttribute("stroke-width", "2")
      svg.appendChild(circle)
    })

    // Create labels
    attributes.forEach((attr) => {
      const angle = (attr.angle * Math.PI) / 180
      const labelRadius = radius + 40
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

      // Add values below the label
      const valueText = document.createElementNS("http://www.w3.org/2000/svg", "text")
      valueText.setAttribute("x", x.toString())
      valueText.setAttribute("y", (y + 15).toString())
      valueText.setAttribute("text-anchor", "middle")
      valueText.setAttribute("dominant-baseline", "middle")
      valueText.setAttribute("font-family", "Arial, sans-serif")
      valueText.setAttribute("font-size", "10")
      valueText.setAttribute("fill", "#666")
      valueText.textContent = `${attr.f1} | ${attr.f2}`

      svg.appendChild(text)
      svg.appendChild(valueText)
    })

    // Create legend
    const legend = document.createElementNS("http://www.w3.org/2000/svg", "g")

    // Fighter 1 legend
    const f1LegendRect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    f1LegendRect.setAttribute("x", "20")
    f1LegendRect.setAttribute("y", "20")
    f1LegendRect.setAttribute("width", "15")
    f1LegendRect.setAttribute("height", "15")
    f1LegendRect.setAttribute("fill", "#dc2626")
    f1LegendRect.setAttribute("fill-opacity", "0.7")
    legend.appendChild(f1LegendRect)

    const f1LegendText = document.createElementNS("http://www.w3.org/2000/svg", "text")
    f1LegendText.setAttribute("x", "45")
    f1LegendText.setAttribute("y", "32")
    f1LegendText.setAttribute("font-family", "Arial, sans-serif")
    f1LegendText.setAttribute("font-size", "12")
    f1LegendText.setAttribute("fill", "#374151")
    f1LegendText.textContent = "Fighter 1"
    legend.appendChild(f1LegendText)

    // Fighter 2 legend
    const f2LegendRect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    f2LegendRect.setAttribute("x", "20")
    f2LegendRect.setAttribute("y", "45")
    f2LegendRect.setAttribute("width", "15")
    f2LegendRect.setAttribute("height", "15")
    f2LegendRect.setAttribute("fill", "#2563eb")
    f2LegendRect.setAttribute("fill-opacity", "0.7")
    legend.appendChild(f2LegendRect)

    const f2LegendText = document.createElementNS("http://www.w3.org/2000/svg", "text")
    f2LegendText.setAttribute("x", "45")
    f2LegendText.setAttribute("y", "57")
    f2LegendText.setAttribute("font-family", "Arial, sans-serif")
    f2LegendText.setAttribute("font-size", "12")
    f2LegendText.setAttribute("fill", "#374151")
    f2LegendText.textContent = "Fighter 2"
    legend.appendChild(f2LegendText)

    svg.appendChild(legend)
  }, [fighter1Stats, fighter2Stats])

  return (
    <div className="w-full flex justify-center">
      <svg ref={svgRef} className="max-w-full h-auto" />
    </div>
  )
}
