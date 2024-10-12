import { createUser, signInUser } from "../../server/firebase-auth-methods";
import { getGoogleAuthorisation } from "../../server/google-methods";
import { BooleanStateSetter, ChangeEvent, StringStateSetter } from "../../types";
import { getEmailError, getPasswordError } from "./utils";

export async function handleGoogleLogin(
    setUser: React.SetStateAction<any>,
    role: "staff" | "non-staff"
) {
    getGoogleAuthorisation().then((response) => {
        setUser({ ...response, isGoogleAccount: true, role });
        return;
    });
}

export async function handleSignUpClick(e: React.FormEvent<HTMLFormElement>, setUser: React.SetStateAction<any>, setError: StringStateSetter) {
    e.preventDefault()
    setError("")
    
    const { elements } = e.target
    
    const email = elements.email.value
    const password = elements.password.value

    const emailError = getEmailError(email)
    if (emailError) {
        setError(emailError)
        return
    }

    const passwordError = getPasswordError(password)
    if (passwordError) {
        setError(passwordError)
        return
    }

    const response = await createUser(email, password)
    if (response.error) {
        setError(response.error)
        return
    }
    
    setUser({
        role: "guest",
        email: response.email,
        isGoogleAccount: false
    })
    setError("")
}

export function handleGoogleLoginClick(setIsLoggingIn: BooleanStateSetter, setLoginType: StringStateSetter) {
    setIsLoggingIn(true)
    setLoginType("google")
}

export async function handleEmailLogin(e: React.FormEvent<HTMLFormElement>, setUser: React.SetStateAction<any>, setError: StringStateSetter) {
    e.preventDefault()
    setError("")

    const { elements } = e.target
    
    const email = elements.email.value
    const emailError = getEmailError(email)
    if (emailError) {
        setError(emailError)
        return
    }

    const password = elements.password.value
    const passwordError = getPasswordError(password)
    if (passwordError) {
        setError(passwordError)
        return
    }

    const response = await signInUser(email, password)
    if (response.error) {
        setError(response.error)
        return
    }

    const role = elements.role.value

    setUser({
        role,
        email: response.email,
        isGoogleAccount: false
    })
    setError("")
}

export function handleRoleInputChange(e: ChangeEvent, setRoleInput: StringStateSetter) {
    const selectedRole = e.target.value
    
    setRoleInput(selectedRole)
}