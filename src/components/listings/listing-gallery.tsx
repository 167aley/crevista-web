"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand, ChevronLeft, ChevronRight, X, Grid2x2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ListingGallery({ photos, title }: { photos: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const go = (dir: 1 | -1) =>
    setActive((i) => (i + dir + photos.length) % photos.length);

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl sm:h-[440px]">
        {/* Main */}
        <button
          onClick={() => setLightbox(true)}
          className="group relative col-span-4 row-span-2 h-56 sm:col-span-2 sm:h-auto"
        >
          <Image src={photos[active]} alt={title} fill priority sizes="(max-width:640px) 100vw, 50vw" className="object-cover" />
          <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
        </button>
        {/* Thumbs */}
        {photos.slice(1, 5).map((p, i) => (
          <button
            key={p + i}
            onClick={() => { setActive(i + 1); setLightbox(true); }}
            className="group relative hidden sm:block"
          >
            <Image src={p} alt={`${title} ${i + 2}`} fill sizes="25vw" className="object-cover" />
            <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" />
            {i === 3 && photos.length > 5 && (
              <span className="absolute inset-0 grid place-items-center bg-navy/60 text-sm font-semibold text-white">
                +{photos.length - 5} photos
              </span>
            )}
          </button>
        ))}

        <button
          onClick={() => setLightbox(true)}
          className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-sm font-medium text-navy shadow-soft backdrop-blur hover:bg-white"
        >
          <Grid2x2 className="h-4 w-4" /> All photos
        </button>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-navy/95 backdrop-blur">
          <div className="flex items-center justify-between px-5 py-4 text-white">
            <span className="text-sm">{active + 1} / {photos.length}</span>
            <button onClick={() => setLightbox(false)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="relative flex-1">
            <Image src={photos[active]} alt={title} fill className="object-contain" sizes="100vw" />
            <button onClick={() => go(-1)} aria-label="Previous" className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={() => go(1)} aria-label="Next" className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto px-5 py-4">
            {photos.map((p, i) => (
              <button
                key={p + i}
                onClick={() => setActive(i)}
                className={cn(
                  "relative h-16 w-24 shrink-0 overflow-hidden rounded-md",
                  i === active ? "ring-2 ring-gold" : "opacity-60 hover:opacity-100",
                )}
              >
                <Image src={p} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
