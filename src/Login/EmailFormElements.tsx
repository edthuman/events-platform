import { useState } from "react"
import { handleTextInput } from "../event-handler"

function EmailFormElements() {
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    return <>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" value={emailInput} onChange={e => handleTextInput(e, setEmailInput)}/>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" value={passwordInput} onChange={e => handleTextInput(e, setPasswordInput)}/>
    </>
}

export default EmailFormElements