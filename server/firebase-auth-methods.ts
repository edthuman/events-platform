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
    const { name,  datetime, description } = showing
    const url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
    
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }

    try {
        const startDate = datetime.toDate()
        
        const eventDetails = {
            summary: name,
            description,
            htmlLink: `http://localhost:5173${showing.id}`,
            start: {
                dateTime: startDate
            },
            end: {
                dateTime: startDate
            }
        }

        await axios.post(url, eventDetails, { headers })
    } catch (error) {
        console.error(error)
    }
}