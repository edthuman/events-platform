import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

export async function getGoogleAuthorisation() {
    try {
        const provider = new GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/calendar")
    
        const auth = getAuth()
    
        const result = await signInWithPopup(auth, provider)
        const { email } = result.user
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        
        return { 
            email, 
            token, 
            error: false
        }
    }
    catch (err) {
        return { error: true }
    }
}