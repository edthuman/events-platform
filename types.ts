import { Timestamp } from "@firebase/firestore"
import { FilmDetailsResponse } from "./server/omdb-types"

export type User = {
    role: string
    username: string
}

export type SetUser = React.Dispatch<React.SetStateAction<User>>

export type Showing = {
    id: string
    name: string
    film: string
    description: string
    datetime: Timestamp
    poster: string
    imdbId: string
}

export type ErrorMessage = {
    error: string
}

export type BooleanStateSetter = React.Dispatch<React.SetStateAction<boolean>>

export type StringStateSetter = React.Dispatch<React.SetStateAction<string>>

export type SetFilmDetails = React.Dispatch<React.SetStateAction<FilmDetailsResponse>>
