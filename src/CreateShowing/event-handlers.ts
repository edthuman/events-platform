import { BooleanStateSetter, SetFilmDetails, StringStateSetter } from "../../types";
import { findFilm } from "../../server/omdb-methods";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export function handleFilmNameInput(e: ChangeEvent, setFilmNameInput: StringStateSetter) {
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

export function handleDateInput(e: ChangeEvent, setDateInput: StringStateSetter) {
    const dateRegex = /\d\d-\d\d-\d\d/
    const dateTyped = e.target.value

    if (dateRegex.test(dateTyped)) {
        setDateInput(e.target.value)
    }
}