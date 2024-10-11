import { createUser } from "../../server/firestore-methods";
import { getGoogleAuthorisation } from "../../server/google-methods";
import { BooleanStateSetter, StringStateSetter } from "../../types";

export async function handleGoogleLogin(
    setUser: React.SetStateAction<any>,
    role: "staff" | "non-staff"
) {
    getGoogleAuthorisation().then((response) => {
        setUser({ ...response, role });
        return;
    });
}

export async function handleSignUpClick(e: React.FormEvent<HTMLFormElement>, setUser: React.SetStateAction<any>, setError: StringStateSetter) {
    e.preventDefault()
    setError("")
    
    const { elements } = e.target
    
    const email = elements.email.value
    const password = elements.password.value

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!emailRegex.test(email)) {
        setError("Must give a valid email")
        return
    }

    if (password.length < 6) {
        setError("Password must be longer than six characters")
        return
    }
    if (password.length > 30) {
        setError("Password must be 30 characters or fewer")
        return
    }

    const response = await createUser(email, password)
    setUser({
        role: "guest",
        email: response.email
    })
    setError("")
}

export function handleGoogleLoginClick(setIsLoggingIn: BooleanStateSetter, setLoginType: StringStateSetter) {
    setIsLoggingIn(true)
    setLoginType("google")
}

export function handleEmailLogin(e: React.FormEvent<HTMLFormElement>, setUser: React.SetStateAction<any>, setError: StringStateSetter) {
    
}