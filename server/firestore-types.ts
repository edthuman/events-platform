import { Timestamp } from "@firebase/firestore"

export type Showing = {
    id: string
    name: string
    film: string
    description: string
    startDate: Timestamp
    endDate: Timestamp
    poster: string
    imdbId: string
    price: "any" | number
    attendees: string[]
}

export type UpdateResponse = {
    error: boolean 
}