import axios from "axios";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Showing } from "./firestore-types";

export async function getGoogleAuthorisation() {
    try {
        const provider = new GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/calendar")
    
        const auth = getAuth()
    
        const result = await signInWithPopup(auth, provider)
        const { email } = result.user
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential) {
            return { error: true }
        }
        
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

export async function addToCalendar(showing: Showing, token: string) {
    const { name,  startDate, endDate, description } = showing
    const url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
    
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }

    try {
        const start = { dateTime: startDate.toDate() }
        const end = { dateTime: endDate.toDate() }
        
        const eventDetails = {
            summary: name,
            description,
            htmlLink: `http://localhost:5173${showing.id}`,
            start,
            end
        }

        await axios.post(url, eventDetails, { headers })
        return { error: "" }
    } catch (error) {
        return {error: "Something went wrong whilst adding to calendar"}
    }
}