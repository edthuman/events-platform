import { SetStateAction } from "react";
import { BooleanStateSetter, FoundFilmDetails } from "../../types";
import { findFilm } from "../../server/omdb-methods";

export function handleFilmNameInput(e: React.ChangeEvent<HTMLInputElement>, setFilmNameInput: React.Dispatch<SetStateAction<string>>) {
    setFilmNameInput(e.target.value);
}

export async function findFilmDetails(e: React.FormEvent<HTMLFormElement>, filmNameInput: string, setError: React.Dispatch<SetStateAction<string>>, setFilmDetails: React.Dispatch<SetStateAction<{} | FoundFilmDetails>>, omdbKey: string) {
    e.preventDefault();

    if (filmNameInput === "") {
        setError("No name given")
        setFilmDetails({})
        return
    }

    const fetchedFilmDetails = await findFilm(omdbKey, filmNameInput);

    if (fetchedFilmDetails.error) {
        setError(fetchedFilmDetails.error)
        setFilmDetails({})
        return
    }

    setFilmDetails(fetchedFilmDetails);
    setError("")
}

export function handleFilmFound(setIsSearchRequired: BooleanStateSetter) {
    setIsSearchRequired(false)
}