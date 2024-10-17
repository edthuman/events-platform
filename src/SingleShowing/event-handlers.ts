import { Firestore } from "@firebase/firestore";
import { addAttendee } from "../../server/firestore-methods";
import { BooleanStateSetter, FormSubmitEvent, StringStateSetter } from "../../types";
import { addToCalendar } from "../../server/google-methods";
import { Showing } from "../../server/firestore-types";
import { Stripe, StripeElements } from "@stripe/stripe-js";

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

export function handleBuyTicketClick(setIsPaying: BooleanStateSetter, setIsButtonDisabled: BooleanStateSetter, setIsError: BooleanStateSetter, setIsUserAttending: BooleanStateSetter, firebase: Firestore, email: string, showingId: string, price: number | "any", donation: string) {
    setIsButtonDisabled(true)
    setIsError(false)
    
    const isDonationZero = price === "any" && Number(donation) === 0
    const isFree = price === 0 || isDonationZero
    if (isFree) {
        handleRegistration(setIsButtonDisabled, setIsError, setIsUserAttending, firebase, email, showingId)
        return
    }

    setIsPaying(true)
}

export async function handlePayment (e: FormSubmitEvent, stripe: Stripe, elements: StripeElements, showingId: string, setIsLoading: BooleanStateSetter, setMessage: StringStateSetter) {
    e.preventDefault();

    if (!stripe || !elements) {
        return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: `http://localhost:5173/complete?showing=${showingId}`,
        },
        redirect: undefined,
    });

    if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
    } else {
        setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
};