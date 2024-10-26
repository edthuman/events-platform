import { Firestore } from "@firebase/firestore";
import { addAttendee } from "../../server/firestore-methods";
import { BooleanStateSetter, FormSubmitEvent, StringStateSetter } from "../../types";
import { Stripe, StripeElements } from "@stripe/stripe-js";

async function handleRegistration(
    setIsButtonDisabled: BooleanStateSetter,
    setError: StringStateSetter,
    setIsUserAttending: BooleanStateSetter,
    firebase: Firestore,
    email: string,
    showingId: string
) {
    const response = await addAttendee(firebase, email, showingId);

    if (response.error) {
        setError("Error occurred during registration, please try again");
        setIsButtonDisabled(false);
        return;
    }

    setIsUserAttending(true);
}

export function handleBuyTicketClick(setIsPaying: BooleanStateSetter, setIsButtonDisabled: BooleanStateSetter, setError: StringStateSetter, setIsUserAttending: BooleanStateSetter, firebase: Firestore, email: string, showingId: string, price: number | "any", donation: string) {
    setIsButtonDisabled(true)
    setError("")
    
    const isDonationZero = price === "any" && Number(donation) === 0
    const isFree = price === 0 || isDonationZero
    if (isFree) {
        handleRegistration(setIsButtonDisabled, setError, setIsUserAttending, firebase, email, showingId)
        return
    }

    const isInvalidDonation = price === "any" && Number(donation) < 0.5 
    if (isInvalidDonation) {
        setError("Payment must be £0.00 or above £0.50")
        setIsButtonDisabled(false)
        return
    }

    setIsPaying(true)
}

export async function handlePayment (e: FormSubmitEvent, stripe: Stripe, elements: StripeElements, showingId: string, setIsLoading: BooleanStateSetter, setMessage: StringStateSetter, url: string) {
    e.preventDefault();

    if (!stripe || !elements) {
        return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: `${url}/complete?showing=${showingId}`,
        },
        redirect: undefined,
    });

    if (error.type === "card_error" || error.type === "validation_error") {
        if (typeof error.message !== "string") {
            // Needed to prevent TypeScript error
            return
        }
        setMessage(error.message);
    } else {
        setMessage("An unexpected error occurred");
    }

    setIsLoading(false);
};