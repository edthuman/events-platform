import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentResponse from "./PaymentResponse";

const stripePromise = loadStripe(
    "pk_test_51Q9nghKK7ykYcCh0ywwIIxPTONKVi1uxYPrboXY4LQfSGkIs9Mj0vSwWsmGeFhYMtwDhCk8B0ZWsZKXdVcXBjSYQ00juMM9MCx"
);

function PaymentComplete() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentResponse />
        </Elements>
    );
}

export default PaymentComplete