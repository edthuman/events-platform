import { Timestamp } from "@firebase/firestore"

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
}