import { Firestore, Timestamp } from "@firebase/firestore";
import { addAttendee, updateShowing } from "../../server/firestore-methods";
import { BooleanStateSetter, FormSubmitEvent, StringStateSetter } from "../../types";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { getDurationSeconds, getEventDetailsError } from "../../utils/event-details-utils";
import { Showing } from "../../server/firestore-types";

async function handleRegistration(
    setIsButtonDisabled: BooleanStateSetter,
    setError: StringStateSetter,
    setIsUserAttending: BooleanStateSetter,
    firestore: Firestore,
    email: string,
    showingId: string
) {
    const response = await addAttendee(firestore, email, showingId);

    if (response.error) {
        setError("Error occurred during registration, please try again");
        setIsButtonDisabled(false);
        return;
    }

    setIsUserAttending(true);
}

export function handleBuyTicketClick(setIsPaying: BooleanStateSetter, setIsButtonDisabled: BooleanStateSetter, setError: StringStateSetter, setIsUserAttending: BooleanStateSetter, firestore: Firestore, email: string, showingId: string, price: number | "any", donation: string) {
    setIsButtonDisabled(true)
    setError("")
    
    const isDonationZero = price === "any" && Number(donation) === 0
    const isFree = price === 0 || isDonationZero
    if (isFree) {
        handleRegistration(setIsButtonDisabled, setError, setIsUserAttending, firestore, email, showingId)
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

export async function handlePayment(e: FormSubmitEvent, stripe: Stripe, elements: StripeElements, showingId: string, setIsLoading: BooleanStateSetter, setMessage: StringStateSetter, url: string) {
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

export async function handleEventEditSubmit(e: any, firestore: Firestore, showing: Showing, setError: StringStateSetter, setIsPosting: BooleanStateSetter, setHasPosted: BooleanStateSetter) {
    e.preventDefault()
    setIsPosting(true)
    
    const showingId = showing.id
    const elements = e.target.elements
    const date = elements.date.value
    const time = elements.time.value

    let startDate: Timestamp
    try {
        const fullStartDate = new Date(`${date}T${time}Z`)
        startDate = Timestamp.fromDate(fullStartDate)
    }
    catch {
        setError("Invalid date or time given")
        setIsPosting(false)
        return
    }
    
    const duration = elements.duration.value
    const durationSeconds = getDurationSeconds(duration)
    const endSeconds = startDate.seconds + durationSeconds

    let endDate
    try {
        endDate = new Timestamp(endSeconds, 0)
    } catch (err) {
        setError("Invalid duration")
        setIsPosting(false)
        return
    }
    const eventName = elements["event-name"].value
    const description = elements.description.value
    const error = getEventDetailsError(eventName, description)
    if (error) {
        setError(error)
        setIsPosting(false)
        return
    }

    let price: "any" | number
    const priceType = elements["price-type"].value
    if (priceType === "set") {
        const priceInput = Number(elements["price"].value)
        if (priceInput === 0) {
            setError("Set price must not be free")
            setIsPosting(false)
            return
        }
        price = priceInput
    } else {
        price = (priceType === "free" ? 0 : "any")
    }

    const response = await updateShowing(firestore, showingId, eventName, startDate, endDate, description, price)
    setError(response.error)
    setIsPosting(false)
    if (!response.error){
        setHasPosted(true)
    }
}