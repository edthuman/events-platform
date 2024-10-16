import { Firestore } from "@firebase/firestore";
import { addAttendee } from "../../server/firestore-methods";
import { BooleanStateSetter, ChangeEvent, StringStateSetter } from "../../types";
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

export function handleBuyTicketClick(setIsPaying: BooleanStateSetter, setIsButtonDisabled: BooleanStateSetter, setIsError: BooleanStateSetter, setIsUserAttending: BooleanStateSetter, firebase: Firestore, email: string, showingId: string, price: number | "any") {
    setIsButtonDisabled(true)
    setIsError(false)

    if (price === 0) {
        handleRegistration(setIsButtonDisabled, setIsError, setIsUserAttending, firebase, email, showingId)
        return
    }

    setIsPaying(true)
}

export function handleDonationInput(e: ChangeEvent, setDonation: StringStateSetter, setError: StringStateSetter) {
    setError("")
    const donationInput = e.target.value
    const nonPriceRegex = /^\d{0,3}(\.\d{0,2})?$/
    const isInvalidCharacter = nonPriceRegex.test(donationInput)

    if (!isInvalidCharacter) {
        setError("Invalid price entered (max. £1000)")
        return
    }

    setDonation(donationInput)
}