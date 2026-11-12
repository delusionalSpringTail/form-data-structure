"use client"

import * as React from "react"
import { LinkIcon, Loader2Icon, PlusIcon, Trash2Icon, UploadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { currencies, type ListingData } from "@/lib/listing"

type Mode = "upload" | "url"

function ImageField({
  images,
  onChange,
}: {
  images: string[]
  onChange: (images: string[]) => void
}) {
  const [mode, setMode] = React.useState<Mode>("upload")
  const [url, setUrl] = React.useState("")
  const [uploading, setUploading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY
  const apiUrl =
    process.env.NEXT_PUBLIC_IMGBB_API_URL || "https://api.imgbb.com/1/upload"

  async function handleUpload(file: File) {
    setError(null)
    if (!apiKey) {
      setError(
        "imgBB API key is missing. Add NEXT_PUBLIC_IMGBB_API_KEY to .env.local and restart the dev server."
      )
      return
    }
    setUploading(true)
    try {
      const body = new FormData()
      body.append("image", file)
      const res = await fetch(`${apiUrl}?key=${apiKey}`, {
        method: "POST",
        body,
      })
      const json = await res.json()
      if (!res.ok || !json?.data?.url) {
        throw new Error(json?.error?.message || "Upload failed")
      }
      onChange([...images, json.data.url as string])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  function addUrl() {
    const trimmed = url.trim()
    if (!trimmed) return
    onChange([...images, trimmed])
    setUrl("")
  }

  function removeAt(i: number) {
    onChange(images.filter((_, index) => index !== i))
  }

  return (
    <div className="space-y-3">
      {/* Mode switch */}
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={mode === "upload" ? "default" : "outline"}
          onClick={() => setMode("upload")}
        >
          <UploadIcon /> Upload
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === "url" ? "default" : "outline"}
          onClick={() => setMode("url")}
        >
          <LinkIcon /> Image link
        </Button>
      </div>

      {mode === "upload" ? (
        <div>
          <Label
            htmlFor="image-upload"
            className="flex h-24 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-sm text-muted-foreground transition hover:bg-muted"
          >
            {uploading ? (
              <>
                <Loader2Icon className="size-5 animate-spin" />
                Uploading to imgBB…
              </>
            ) : (
              <>
                <UploadIcon className="size-5" />
                Click to choose an image
              </>
            )}
          </Label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="sr-only"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) void handleUpload(file)
              // Allow re-selecting the same file.
              e.target.value = ""
            }}
          />
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addUrl()
              }
            }}
          />
          <Button type="button" variant="outline" onClick={addUrl}>
            <PlusIcon /> Add
          </Button>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {images.length > 0 && (
        <ul className="space-y-2">
          {images.map((image, i) => (
            <li
              key={`${image}-${i}`}
              className="flex items-center gap-2 rounded-lg border p-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={`Image ${i + 1}`}
                className="size-10 shrink-0 rounded-md object-cover"
              />
              <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                {image}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove image ${i + 1}`}
                onClick={() => removeAt(i)}
              >
                <Trash2Icon />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function ListingForm({
  data,
  onChange,
  onSubmit,
  submitting,
}: {
  data: ListingData
  onChange: (data: ListingData) => void
  onSubmit: () => void
  submitting?: boolean
}) {
  const set = <K extends keyof ListingData>(key: K) => (value: ListingData[K]) =>
    onChange({ ...data, [key]: value })

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      {/* Images */}
      <div className="space-y-3">
        <Label>Images</Label>
        <ImageField
          images={data.images}
          onChange={set("images")}
        />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => set("title")(e.target.value)}
          required
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={data.location}
          onChange={(e) => set("location")(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Rating */}
        <div className="space-y-2">
          <Label htmlFor="rating">Rating</Label>
          <Input
            id="rating"
            type="number"
            min={0}
            max={5}
            step={0.01}
            value={data.rating}
            onChange={(e) => set("rating")(Number(e.target.value))}
          />
        </div>
        {/* Reviews */}
        <div className="space-y-2">
          <Label htmlFor="reviews">Reviews</Label>
          <Input
            id="reviews"
            type="number"
            min={0}
            value={data.reviews}
            onChange={(e) => set("reviews")(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Guests */}
        <div className="space-y-2">
          <Label htmlFor="guests">Guests</Label>
          <Input
            id="guests"
            type="number"
            min={1}
            value={data.guests}
            onChange={(e) => set("guests")(Number(e.target.value))}
          />
        </div>
        {/* Price */}
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <div className="flex gap-2">
            <Input
              id="price"
              type="number"
              min={0}
              value={data.price}
              onChange={(e) => set("price")(Number(e.target.value))}
            />
            <Select
              value={data.currency}
              onValueChange={(value) => set("currency")(value as string)}
            >
              <SelectTrigger className="w-24" aria-label="Currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Response time */}
      <div className="space-y-2">
        <Label htmlFor="response-time">Response time</Label>
        <Input
          id="response-time"
          value={data.responseTime}
          onChange={(e) => set("responseTime")(e.target.value)}
        />
      </div>

      {/* Toggles */}
      <div className="flex gap-6">
        <Label className="flex items-center gap-2">
          <Checkbox
            checked={data.superhost}
            onCheckedChange={(checked) => set("superhost")(checked === true)}
          />
          Superhost
        </Label>
        <Label className="flex items-center gap-2">
          <Checkbox
            checked={data.instantBook}
            onCheckedChange={(checked) => set("instantBook")(checked === true)}
          />
          Instant book
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={submitting}>
        Submit
      </Button>
    </form>
  )
}
