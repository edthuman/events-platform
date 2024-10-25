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
import LoggedOutPayAttempt from "./LoggedOutPayAttempt";

export default function CheckoutForm({ showing, donation }: { showing: Showing, donation: string }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { user: { email }} = useContext(UserContext)
    const ticketPrice = showing.price === "any" ? donation : showing.price
    const formattedTicketPrice = Number(ticketPrice).toFixed(2)

    return !email ? (
        <LoggedOutPayAttempt />
    ) : (
        stripe && elements ? (
            <form className="mt-5 px-2" onSubmit={e => handlePayment(e, stripe, elements, showing.id, setIsLoading, setMessage)}>
                {message ? <p className="text-xl my-3 py-2 rounded-lg w-10/12 mx-auto bg-red">{message}</p> : null}
                <AddressElement options={{mode: "shipping"}} />
                <LinkAuthenticationElement options={{defaultValues: { email }}} />
                <PaymentElement />
                <button
                    disabled={isLoading || !stripe || !elements}
                    className="text-lg bg-[#30313c] mt-3 rounded-md border border-[#424352] shadow-md shadow-[#202020]"
                >
                    {`Pay £${formattedTicketPrice}`}
                </button>
            </form>
        ) : null
    )
}
