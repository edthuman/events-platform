import { ChangeEvent } from "react";
import { SetUser, StringStateSetter, User } from "../types";
import { signOutUser } from "../server/firebase-auth-methods";

export function handleTextInput(e: ChangeEvent, setTextInput: StringStateSetter) {
    setTextInput(e.target.value);
}

export function handlePriceInput(e: ChangeEvent, setPriceInput: StringStateSetter, setError: StringStateSetter) {
    setError("")
    const priceInput = e.target.value
    const nonPriceRegex = /^\d{0,3}(\.\d{0,2})?$/
    const isInvalidCharacter = nonPriceRegex.test(priceInput)

    if (!isInvalidCharacter) {
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