import { ChangeEvent, SetUser, StringStateSetter, User } from "../types";
import { signOutUser } from "../server/firebase-auth-methods";

export function handleEventNameInput(e: any, setEventNameInput: StringStateSetter, setError: StringStateSetter) {
    setError("")

    const eventName = e.target.value
    if (eventName.length > 50) {
        setError("Event name must be 50 characters or fewer")
        return
    }
    setEventNameInput(e.target.value);
}

export function handleTextInput(e: any, setTextInput: StringStateSetter) {
    setTextInput(e.target.value);
}

export function handlePriceInput(e: any, setPriceInput: StringStateSetter, setError: StringStateSetter) {
    setError("")
    const priceInput = e.target.value
    const nonPriceRegex = /^\d{0,3}(\.\d{0,2})?$/
    const isInvalidCharacter = !nonPriceRegex.test(priceInput)
    
    if (isInvalidCharacter) {
        setError("Invalid price entered (max. £1000)")
        return
    }
    setPriceInput(priceInput)
}

export async function handleLogOutClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, setError: StringStateSetter, setUser: SetUser) {
    setError("")
    e.preventDefault()
    const { error } = await signOutUser()

    if (error === "") {
        const user: User = { role: "guest", email: "", isGoogleAccount: false }
        window.sessionStorage.setItem("user", JSON.stringify(user))
        setUser(user)
    }

    setError(error)
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

export function handlePriceTypeInput(e: React.ChangeEvent<HTMLSelectElement>, setPriceType: StringStateSetter) {
    setPriceType(e.target.value)
}