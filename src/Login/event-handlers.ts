import { createUser } from "../../server/firestore-methods";
import { getGoogleAuthorisation } from "../../server/google-methods";

export async function handleLogin(
    setUser: React.SetStateAction<any>,
    role: "staff" | "non-staff"
) {
    getGoogleAuthorisation().then((response) => {
        setUser({ ...response, role });
        return;
    });
}

export async function handleSignUpClick(e: React.FormEvent<HTMLFormElement>, setUser: React.SetStateAction<any>) {
    e.preventDefault()
    
    const {elements} = e.target
    
    const email = elements.email.value
    const password = elements.password.value

    const response = await createUser(email, password)
    setUser({
        role: "guest",
        email: response.email
    })
}