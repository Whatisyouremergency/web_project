"use client"

import { useEffect, useRef } from "react"
import type { google } from "google-maps"

interface GoogleMapComponentProps {
  location: {
    lat: number
    lng: number
  }
  eventLocation: string
  eventName: string
}

export default function GoogleMapComponent({ location, eventLocation, eventName }: GoogleMapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.google) return

      const map = new window.google.maps.Map(mapRef.current, {
        center: location,
        zoom: 13,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      })

      mapInstanceRef.current = map

      // Create marker
      const marker = new window.google.maps.Marker({
        position: location,
        map: map,
        title: eventName,
        icon: {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#DC2626" stroke="#fff" strokeWidth="2"/>
              <text x="20" y="26" textAnchor="middle" fill="white" fontFamily="Arial" fontSize="12" fontWeight="bold">UFC</text>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 40),
        },
      })

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #DC2626; font-weight: bold;">${eventName}</h3>
            <p style="margin: 0; color: #666; font-size: 14px;">${eventLocation}</p>
            <p style="margin: 4px 0 0 0; color: #999; font-size: 12px;">UFC Event Location</p>
          </div>
        `,
      })

      marker.addListener("click", () => {
        infoWindow.open(map, marker)
      })

      // Auto-open info window
      infoWindow.open(map, marker)
    }

    // Load Google Maps script if not already loaded
    if (!window.google) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`
      script.async = true
      script.defer = true

      // For demo purposes, we'll use a mock implementation
      window.initMap = initMap

      // Mock Google Maps for demo
      if (!window.google) {
        setTimeout(() => {
          window.google = {
            maps: {
              Map: class MockMap {
                constructor(element: any, options: any) {
                  if (element) {
                    element.innerHTML = `
                      <div style="width: 100%; height: 100%; background: #f0f0f0; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
                        <div style="text-align: center; color: #666;">
                          <div style="font-size: 24px; margin-bottom: 8px;">📍</div>
                          <div style="font-weight: bold; margin-bottom: 4px;">${eventName}</div>
                          <div style="font-size: 14px;">${eventLocation}</div>
                          <div style="font-size: 12px; color: #999; margin-top: 8px;">Google Maps would appear here</div>
                        </div>
                      </div>
                    `
                  }
                }
              },
              Marker: class MockMarker {
                constructor(options: any) {}
                addListener() {}
              },
              InfoWindow: class MockInfoWindow {
                constructor(options: any) {}
                open() {}
              },
              Size: class MockSize {
                constructor(width: number, height: number) {}
              },
            },
          } as any
          initMap()
        }, 100)
      }

      document.head.appendChild(script)
    } else {
      initMap()
    }
  }, [location, eventLocation, eventName])

  return <div ref={mapRef} className="w-full h-full" />
}
