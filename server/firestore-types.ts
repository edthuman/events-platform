import { Timestamp } from "@firebase/firestore"
import { ErrorMessage } from "../types"

export type ShowingWithoutID = {
    name: string
    film: string
    description: string
    datetime: Timestamp
    poster: string
    imdbId: string
}

export interface Showing extends ShowingWithoutID {
    id: string
}

export type SingleShowingResponse = Showing | ErrorMessage