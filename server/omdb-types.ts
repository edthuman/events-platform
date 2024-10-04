import { ErrorMessage } from "../types"

export type FilmDetails = {
    title: string
    year: string
    genre: string
    director: string
    plot: string
    rating: string
    runtime: string
    error: ""
}

export type FilmDetailsResponse = FilmDetails | ErrorMessage

export type FilmPreview = {
    title: string
    year: string
    actors: string
    director: string
    poster: string
    imdbId: string
    error: ""
}

export type FilmPreviewResponse = FilmPreview | ErrorMessage