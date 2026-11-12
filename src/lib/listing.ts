export type ListingData = {
  images: string[]
  superhost: boolean
  title: string
  rating: number
  reviews: number
  guests: number
  instantBook: boolean
  responseTime: string
  location: string
  price: number
  currency: string
}

export const defaultListing: ListingData = {
  images: [],
  superhost: true,
  title: "Bright Gastown Studio",
  rating: 4.98,
  reviews: 406,
  guests: 5,
  instantBook: true,
  responseTime: "Responds within a few hours",
  location: "Vancouver, BC",
  price: 65,
  currency: "CAD",
}

export const currencies = ["CAD", "USD", "EUR", "GBP"] as const
