import { Timestamp } from "@firebase/firestore"
import { ErrorMessage } from "../types"

export type Showing = {
    id: string
    name: string
    film: string
    description: string
    startDate: Timestamp
    endDate: Timestamp
    poster: string
    imdbId: string
    attendees: string[]
}

export type SingleShowingResponse = Showing | ErrorMessage

export type UpdateResponse = {
    error: boolean 
}