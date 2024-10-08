import { Timestamp } from "@firebase/firestore"
import { ErrorMessage } from "../types"

export type Showing = {
    id: string
    name: string
    film: string
    description: string
    datetime: Timestamp
    poster: string
    imdbId: string
    attendees: string[]
}

export type SingleShowingResponse = Showing | ErrorMessage