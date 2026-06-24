"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Listing } from "@/lib/data";
import { formatMoneyShort } from "@/lib/utils";

function priceIcon(listing: Listing, active: boolean) {
  const label =
    listing.deal === "lease" ? `$${listing.leaseRate}/SF` : formatMoneyShort(listing.price);
  const fill = active ? "#002147" : "#c8a14b";
  const w = active ? 36 : 30;
  // Gold building-shaped pin (matches Figma); active turns navy + shows the price label
  return L.divIcon({
    className: "crv-pin",
    html: `<div style="transform:translate(-50%,-100%);position:relative;${active ? "z-index:1000;" : ""}">
      <svg width="${w}" height="${w * 1.3}" viewBox="0 0 24 31" fill="none" style="filter:drop-shadow(0 4px 6px rgba(0,33,71,.35));display:block;">
        <path d="M12 0C5.4 0 0 5.2 0 11.6 0 20.3 12 31 12 31s12-10.7 12-19.4C24 5.2 18.6 0 12 0Z" fill="${fill}"/>
        <g fill="#fff">
          <rect x="6.2" y="9.5" width="3" height="7" rx="0.4"/>
          <rect x="10" y="6" width="4" height="10.5" rx="0.4"/>
          <rect x="15" y="9.5" width="3" height="7" rx="0.4"/>
        </g>
      </svg>
      ${active ? `<span style="position:absolute;left:50%;top:-22px;transform:translateX(-50%);background:#002147;color:#fff;font:600 11px/1 var(--font-inter,sans-serif);padding:5px 8px;border-radius:9999px;white-space:nowrap;box-shadow:0 4px 12px rgba(0,33,71,.3);">${label}</span>` : ""}
    </div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

function FitBounds({ listings }: { listings: Listing[] }) {
  const map = useMap();
  useEffect(() => {
    if (!listings.length) return;
    const bounds = L.latLngBounds(listings.map((l) => [l.lat, l.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 11 });
  }, [listings, map]);
  return null;
}

function FlyToSelected({ listings, selectedId }: { listings: Listing[]; selectedId: string | null }) {
  const map = useMap();
  useEffect(() => {
    const sel = listings.find((l) => l.id === selectedId);
    if (sel) map.flyTo([sel.lat, sel.lng], Math.max(map.getZoom(), 12), { duration: 0.6 });
  }, [selectedId, listings, map]);
  return null;
}

export default function PropertyMap({
  listings,
  activeId,
  selectedId,
  onSelect,
}: {
  listings: Listing[];
  activeId: string | null;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const center = useMemo<[number, number]>(() => {
    if (!listings.length) return [39.5, -98.35];
    return [listings[0].lat, listings[0].lng];
  }, [listings]);

  return (
    <MapContainer
      center={center}
      zoom={5}
      scrollWheelZoom
      className="h-full w-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <FitBounds listings={listings} />
      <FlyToSelected listings={listings} selectedId={selectedId} />
      {listings.map((l) => (
        <Marker
          key={l.id}
          position={[l.lat, l.lng]}
          icon={priceIcon(l, l.id === activeId || l.id === selectedId)}
          eventHandlers={{ click: () => onSelect(l.id) }}
        />
      ))}
    </MapContainer>
  );
}
