import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

export async function createUser(email: string, password: string) {
    try {
        const auth = getAuth()
        const response = await createUserWithEmailAndPassword(auth, email, password)
        if (!response.user.email) {
            return { error: "Something went wrong whilst creating login" }
        }

        return {
            email: response.user.email,
            error: ""
        }
    }
    catch (err: any) {
        if (err.code === "auth/email-already-in-use") {
            return { error: "A user already exists with that email" }
        }
        return { error: "Something went wrong whilst creating login" }
    }
}

export async function signInUser(email: string, password: string) {
    try {
        const auth = getAuth()
        const response = await signInWithEmailAndPassword(auth, email, password)
        if (!response) {
            return { error: "Something went wrong during login" }
        }
        
        return {
            email: response.user.email,
            error: ""
        }
    }
    catch (err: any) {
        if (err.code === "auth/invalid-credential") {
            return { error: "No user found with given details" }
        }
        return { error: "Something went wrong during login" }
    }
}