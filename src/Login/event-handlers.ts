import { getGoogleAuthorisation } from "../../server/firebase-auth-methods"

export async function handleLogin(setUser: React.SetStateAction<any>, role: "staff" | "non-staff"){
    getGoogleAuthorisation()
    .then((response)=>{
        setUser({...response, role})
        return
    })
}