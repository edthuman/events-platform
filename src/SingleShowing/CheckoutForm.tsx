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

export default function CheckoutForm({ showing }: { showing: Showing }) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user: { email }} = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `http://localhost:5173/complete?showing=${showing.id}`,
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
  
    return <form id="payment-form" onSubmit={handleSubmit}>
        <AddressElement options={{mode: "shipping"}}/>
        <LinkAuthenticationElement options={{defaultValues: { email }}}/>
        <PaymentElement
            id="payment-element"
        />
        <button
            disabled={isLoading || !stripe || !elements}
            id="submit"
        >
            {`Pay £${showing.price}`}
        </button>
        {message ? <div id="payment-message">{message}</div> : null}
    </form>
}
