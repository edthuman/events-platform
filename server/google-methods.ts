import axios from "axios";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Showing } from "./firestore-types";
import { BooleanStateSetter, StringStateSetter } from "../types";

export async function getGoogleAuthorisation() {
    try {
        const provider = new GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/calendar");

        const auth = getAuth();

        const result = await signInWithPopup(auth, provider);
        const { email } = result.user;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential) {
            return { error: true };
        }

        const token = credential.accessToken;

        return {
            email,
            token,
            error: false,
        };
    } catch (err) {
        return { error: true };
    }
}

export async function checkShowingInCalendar(
    showing: Showing,
    token: string,
    setIsNotInCalendar: BooleanStateSetter,
    setIsLoading: BooleanStateSetter,
    setCalendarError: StringStateSetter
) {
    const url =
        "https://www.googleapis.com/calendar/v3/calendars/primary/events";
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await axios.get(url, { headers });
        const events = response.data.items;
        const isOnCalendar = events.findIndex((event: any) => {
            const nameMatches = event.summary === showing.name;
            const descriptionMatches = event.description === showing.description;

            return nameMatches && descriptionMatches;
        });

        if (isOnCalendar === -1) {
            setIsLoading(false);
            return;
        }
        setIsNotInCalendar(false);
        setIsLoading(false);
    }
    catch (err) {
        setCalendarError("Error occurred whilst connecting to Google Calendar")
        setIsLoading(false)
    }
}
