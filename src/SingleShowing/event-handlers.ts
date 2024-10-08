import { Firestore } from "@firebase/firestore";
import { addAttendee } from "../../server/firestore-methods";
import { BooleanStateSetter, StringStateSetter } from "../../types";
import { addToCalendar } from "../../server/google-methods";
import { Showing } from "../../server/firestore-types";

export async function handleRegistration(
    setIsButtonDisabled: BooleanStateSetter,
    setIsError: BooleanStateSetter,
    setIsUserAttending: BooleanStateSetter,
    firebase: Firestore,
    email: string,
    showingId: string
) {
    setIsButtonDisabled(true);
    setIsError(false);

    const response = await addAttendee(firebase, email, showingId);

    if (response.error) {
        setIsError(true);
        setIsButtonDisabled(false);
        return;
    }

    setIsUserAttending(true);
}

export async function handleAddToCalendarClick(
    showing: Showing,
    token: string,
    setIsNotInCalendar: BooleanStateSetter,
    setIsLoading: BooleanStateSetter,
    setError: StringStateSetter
) {
    setError("")
    setIsLoading(true)
    const response = await addToCalendar(showing, token);
    if (response.error) {
        setIsLoading(false)
        setError("Something went wrong whilst adding to calendar")
        return;
    }
    setIsNotInCalendar(false);
    setIsLoading(false)
}
