import { useContext, useState } from "react"
import { handleSignUpClick } from "./event-handlers"
import "./SignUpForm.css"
import UserContext from "../../hooks/UserContext"
import { handleTextInput } from "../event-handler"

function SignUpForm() {
    const { setUser } = useContext(UserContext)
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [error, setError] = useState("")

    return setUser ? (<>
        {error ? <p>{error}</p> : null}
        <form id="sign-up-form" onSubmit={e => handleSignUpClick(e, setUser, setError)}>
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" value={emailInput} onChange={e => handleTextInput(e, setEmailInput)}/>
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" value={passwordInput} onChange={e => handleTextInput(e, setPasswordInput)}/>
            <button type="submit">Sign Up</button>
        </form>
    </>
    )
    : null
}

export default SignUpForm