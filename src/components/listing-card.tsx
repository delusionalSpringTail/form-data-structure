"use client"

import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  ShareIcon,
  StarIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react"

import type { ListingData } from "@/lib/listing"

export function ListingCard({ data }: { data: ListingData }) {
  const [index, setIndex] = React.useState(0)
  const hasMultipleImages = data.images.length > 1

  // Keep the carousel index valid when the image list changes.
  const safeIndex = Math.min(index, Math.max(data.images.length - 1, 0))

  const prev = () => setIndex((i) => (i - 1 + data.images.length) % data.images.length)
  const next = () => setIndex((i) => (i + 1) % data.images.length)

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border bg-card p-3 shadow-sm">
      {/* Image area */}
      <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
        {data.images.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.images[safeIndex]}
            alt={`${data.title} — image ${safeIndex + 1}`}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
            No image yet
          </div>
        )}

        {/* Top-left badge */}
        {data.superhost && (
          <span className="absolute top-3 left-3 rounded-lg bg-white/90 px-2.5 py-1 text-xs font-semibold tracking-wide text-neutral-900 shadow">
            SUPERHOST
          </span>
        )}

        {/* Top-right actions */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            type="button"
            aria-label="Share"
            className="flex size-8 items-center justify-center rounded-lg bg-white/90 text-neutral-900 shadow transition hover:bg-white"
          >
            <ShareIcon className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Save"
            className="flex size-8 items-center justify-center rounded-lg bg-white/90 text-neutral-900 shadow transition hover:bg-white"
          >
            <HeartIcon className="size-4" />
          </button>
        </div>

        {/* Carousel arrows — only shown on hover and only with multiple images */}
        {hasMultipleImages && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={prev}
              className="absolute top-1/2 left-2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 opacity-0 shadow transition-opacity group-hover:opacity-100"
            >
              <ChevronLeftIcon className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={next}
              className="absolute top-1/2 right-2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 opacity-0 shadow transition-opacity group-hover:opacity-100"
            >
              <ChevronRightIcon className="size-4" />
            </button>
          </>
        )}
      </div>

      {/* Info */}
      <div className="pt-3">
        <h3 className="text-lg font-semibold tracking-tight">{data.title}</h3>
        <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 pt-1 text-sm">
          <span className="flex items-center gap-1">
            <StarIcon className="size-4 fill-current" />
            <span className="font-medium">
              {data.rating.toFixed(2)} ({data.reviews})
            </span>
          </span>
          <span className="text-muted-foreground">•</span>
          <span className="flex items-center gap-1">
            <UsersIcon className="size-4 text-muted-foreground" />
            {data.guests} guests
          </span>
          {data.instantBook && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className="flex items-center gap-1">
                <ZapIcon className="size-4 fill-yellow-400 text-yellow-500" />
                Instant book
              </span>
            </>
          )}
        </p>
        <p className="pt-1 text-sm text-muted-foreground">
          {data.responseTime} • {data.location}
        </p>
        <p className="pt-2">
          <span className="text-lg font-bold">${data.price}</span>{" "}
          <span className="text-sm text-muted-foreground">
            {data.currency}/hr
          </span>
        </p>
      </div>
    </div>
  )
}
