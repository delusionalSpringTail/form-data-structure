"use client"

import * as React from "react"

import { ListingCard } from "@/components/listing-card"
import { ListingForm } from "@/components/listing-form"
import { defaultListing, type ListingData } from "@/lib/listing"

export function ListingBuilder() {
  const [data, setData] = React.useState<ListingData>(defaultListing)
  const [submitted, setSubmitted] = React.useState<ListingData | null>(null)

  function handleSubmit() {
    setSubmitted(data)
    // Also available programmatically:
    console.log(data);
    console.log(JSON.stringify(data, null, 2))
  }


// NEXT_PUBLIC_IMGBB_API_URL=https://api.imgbb.com/1/upload
// NEXT_PUBLIC_IMGBB_API_KEY=8d3f361ba3224f58aab94e25e3db1276

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_380px]">
      {/* Form */}
      <div>
        <h1 className="pb-6 text-2xl font-semibold tracking-tight">
          Create a listing
        </h1>
        <ListingForm
          data={data}
          onChange={setData}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Live preview */}
      <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
        <h2 className="text-sm font-medium text-muted-foreground">
          Live preview
        </h2>
        <ListingCard data={data} />

        {submitted && (
          <div className="space-y-2 rounded-xl border bg-muted/50 p-4">
            <h3 className="text-sm font-medium">Submitted JSON</h3>
            <pre className="max-h-96 overflow-auto rounded-lg bg-background p-3 text-xs leading-relaxed">
              {JSON.stringify(submitted, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
