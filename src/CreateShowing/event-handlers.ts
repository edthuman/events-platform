import { BooleanStateSetter, SetFilmDetails, StringStateSetter } from "../../types";
import { findFilm } from "../../server/omdb-methods";

export function handleFilmNameInput(e: React.ChangeEvent<HTMLInputElement>, setFilmNameInput: StringStateSetter) {
    setFilmNameInput(e.target.value);
}

export async function findFilmDetails(e: React.FormEvent<HTMLFormElement>, filmNameInput: string, setError: StringStateSetter, setFilmDetails: SetFilmDetails, omdbKey: string) {
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