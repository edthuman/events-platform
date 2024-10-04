import { BooleanStateSetter, SetFilmDetails, StringStateSetter } from "../../types";
import { getFilmPreview } from "../../server/omdb-methods";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

type FormSubmitEvent = React.FormEvent<HTMLFormElement>

export function handleTextInput(e: ChangeEvent, setTextInput: StringStateSetter) {
    setTextInput(e.target.value);
}

export async function findFilmDetails(e: FormSubmitEvent, filmNameInput: string, setFilmDetails: SetFilmDetails, omdbKey: string) {
    e.preventDefault();

    if (filmNameInput === "") {
        setFilmDetails({ error: "No name given" })
        return
    }

    const fetchedFilmDetails = await getFilmPreview(omdbKey, filmNameInput);

    if (fetchedFilmDetails.error) {
        setFilmDetails({ error: fetchedFilmDetails.error })
        return
    }

    setFilmDetails(fetchedFilmDetails);
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

export function handleTimeInput(e: ChangeEvent, setTimeInput: StringStateSetter) {
    const timeRegex = /\d\d:\d\d/
    const timeTyped = e.target.value

    if (!timeRegex.test(timeTyped)) {
        return
    }

    const hourTyped = Number(timeTyped.slice(0,2))
    const minsTyped = Number(timeTyped.slice(-2))
    
    if (hourTyped < 24 && minsTyped < 60) {
        setTimeInput(timeTyped)
    }
}

export function handleEventFormSubmit(e: FormSubmitEvent) {
    e.preventDefault()
}