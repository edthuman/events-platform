import { Timestamp } from "@firebase/firestore"
import { ErrorMessage } from "../types"

export type Showing = {
    name: string
    film: string
    description: string
    datetime: Timestamp
    poster: string
    imdbId: string
}

export type SingleShowingResponse = Showing | ErrorMessage