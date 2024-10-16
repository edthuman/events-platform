import { BooleanStateSetter, ChangeEvent, FormSubmitEvent, SetFilmDetails, StringStateSetter } from "../../types";
import { getFilmPreview } from "../../server/omdb-methods";
import { postShowing } from "../../server/firestore-methods";
import { Firestore, Timestamp } from "@firebase/firestore";
import { getDurationSeconds, getEventDetailsError } from "./utils";

export async function findFilmDetails(e: FormSubmitEvent, searchInput: string, setFilmDetails: SetFilmDetails, omdbKey: string, setIsLoading: BooleanStateSetter, isNameSearch: boolean) {
    e.preventDefault();
    setIsLoading(true)

    if (searchInput === "") {
        setFilmDetails({ error: "No name given" })
        setIsLoading(false)
        return
    }

    const fetchedFilmDetails = await getFilmPreview(omdbKey, searchInput, isNameSearch);

    if (fetchedFilmDetails.error) {
        setFilmDetails({ error: fetchedFilmDetails.error })
        setIsLoading(false)
        return
    }

    setFilmDetails(fetchedFilmDetails);
    setIsLoading(false)
}

export function handleFilmFound(setIsSearchRequired: BooleanStateSetter) {
    setIsSearchRequired(false)
}

export function handleIncorrectFilmFound(setFilmDetails: any) {
    setFilmDetails({ error: "" })
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

export async function handleEventFormSubmit(e: FormSubmitEvent, film: string, imdbId: string, posterUrl: string, firestore: Firestore, setError: StringStateSetter, setShowingId: StringStateSetter, setIsPosting: BooleanStateSetter) {
    e.preventDefault()
    setIsPosting(true)

    const elements = e.target.elements

    const date = elements.date.value
    const time = elements.time.value    

    let startDate: Timestamp
    try {
        const fullStartDate = new Date(`${date}T${time}Z`)
        startDate = Timestamp.fromDate(fullStartDate)
    }
    catch {
        setError("Invalid date or time given")
        setIsPosting(false)
        return
    }
    
    const duration = elements.duration.value
    const durationSeconds = getDurationSeconds(duration)
    const endSeconds = startDate.seconds + durationSeconds

    let endDate
    try {
        endDate = new Timestamp(endSeconds, 0)
    } catch (err) {
        setError("Invalid duration")
        setIsPosting(false)
        return
    }

    const eventName = elements["event-name"].value
    const description = elements.description.value
    const error = getEventDetailsError(eventName, description)
    if (error) {
        setError(error)
        setIsPosting(false)
        return
    }

    let price: "any" | number
    const priceType = elements["price-type"].value
    if (priceType === "set") {
        const priceInput = Number(elements["price"].value)
        if (priceInput === 0) {
            setError("Set price must not be free")
            setIsPosting(false)
            return
        }
        price = priceInput
    } else {
        price = (priceType === "free" ? 0 : "any")
    }

    const response = await postShowing(firestore, eventName, startDate, endDate, description, film, imdbId, posterUrl, price)

    if (response.error) {
        setError(response.error)
        setIsPosting(false)
        return
    }

    // TypeScript error on response.id possibly being undefined can be ignored - response from postShowing will always have an id if error is an empty string
    setError("")
    setShowingId(response.id)
    setIsPosting(false)
}

export function handlePriceTypeInput(e: ChangeEvent, setPriceType: StringStateSetter) {
    setPriceType(e.target.value)
}