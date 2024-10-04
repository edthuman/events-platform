import { FilmDetailsResponse } from "./server/omdb-types"

export type User = {
    role: string
    username: string
}

export type SetUser = React.Dispatch<React.SetStateAction<User>>

export type ErrorMessage = {
    error: string
}

export type BooleanStateSetter = React.Dispatch<React.SetStateAction<boolean>>

export type StringStateSetter = React.Dispatch<React.SetStateAction<string>>

export type SetFilmDetails = React.Dispatch<React.SetStateAction<FilmDetailsResponse>>
