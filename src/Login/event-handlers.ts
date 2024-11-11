import { createUser, signInUser } from "../../server/firebase-auth-methods";
import { getGoogleAuthorisation } from "../../server/google-methods";
import { SetUser, StringStateSetter, User } from "../../types";
import { getEmailError, getPasswordError } from "./utils";
import { checkIsStaff } from "../../server/realtime-methods"

export async function handleGoogleLogin(
    setUser: React.SetStateAction<any>,
    role: "staff" | "non-staff",
    setError: StringStateSetter
) {
    try {
        const response = await getGoogleAuthorisation()

        const user = {
            ...response,
            isGoogleAccount: true,
            role 
        }

        window.sessionStorage.setItem("user", JSON.stringify(user))
        setUser(user);
    }
    catch (err) {
        setError("Something went wrong during sign in")
    }
}

export async function handleSignUpClick(e: any, setUser: React.SetStateAction<any>, setError: StringStateSetter) {
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
    
    setUser((currUser: User) => {
        const user = {
            role: currUser.role,
            email: response.email,
            isGoogleAccount: false
        }
        
        window.sessionStorage.setItem("user", JSON.stringify(user))
        return user
    })
    setError("")
}

export async function handleEmailLogin(e: any, setUser: React.SetStateAction<any>, setError: StringStateSetter, role: string, firebase: any, databaseURL: string) {
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

    if (role === "staff") {
        const response = await checkIsStaff(firebase, databaseURL, email)
        if (response.error) {
            setError(response.error)
            return
        }
        if (response.isInvalidEmail) {
            setError("No staff account exists with this email")
            return
        }
    }

    if (role === "non-staff") {
        const response = await checkIsStaff(firebase, databaseURL, email)
        if (response.error) {
            setError(response.error)
            return
        }
        const isStaff = !response.isInvalidEmail
        if (isStaff) {
            setError("Login failed - attempting to log in with staff email")
            return
        }
    }

    const response = await signInUser(email, password)
    if (response.error) {
        setError(response.error)
        return
    }

    setUser((currUser: User) => {
        const user = {
            role: currUser.role,
            email: response.email,
            isGoogleAccount: false
        }
        
        window.sessionStorage.setItem("user", JSON.stringify(user))
        return user
    })
    
    setError("")
}

export function handleRoleSelection(setUser: SetUser, newRole: "non-staff" | "staff") {
    setUser((currUser: User) => {
        const newUser = {...currUser}
        newUser.role = newRole
        return newUser
    })
}