import { useContext, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
    LinkAuthenticationElement,
    AddressElement,
} from "@stripe/react-stripe-js";
import UserContext from "../../hooks/UserContext";
import { Showing } from "../../server/firestore-types";
import { handlePayment } from "./event-handlers";

export default function CheckoutForm({ showing, donation }: { showing: Showing, donation: string }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { user: { email }} = useContext(UserContext)
    const ticketPrice = showing.price === "any" ? donation : showing.price
  
    return stripe && elements ? (
        <form id="payment-form" onSubmit={e => handlePayment(e, stripe, elements, showing.id, setIsLoading, setMessage)}>
            <AddressElement options={{mode: "shipping"}}/>
            <LinkAuthenticationElement options={{defaultValues: { email }}}/>
            <PaymentElement
                id="payment-element"
            />
            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
            >
                {`Pay £${ticketPrice}`}
            </button>
            {message ? <div id="payment-message">{message}</div> : null}
        </form>
    ) : null
}
