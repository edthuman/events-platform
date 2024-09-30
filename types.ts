export type User = {
    role: string,
    username: string
}

export type SetUser = React.Dispatch<React.SetStateAction<User>>