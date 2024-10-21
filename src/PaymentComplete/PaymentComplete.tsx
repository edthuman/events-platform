import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentResponse from "./PaymentResponse";
import { useContext, useEffect } from "react";
import UserContext from "../../hooks/UserContext";

const stripePromise = loadStripe(
    "pk_test_51Q9nghKK7ykYcCh0ywwIIxPTONKVi1uxYPrboXY4LQfSGkIs9Mj0vSwWsmGeFhYMtwDhCk8B0ZWsZKXdVcXBjSYQ00juMM9MCx"
);

function PaymentComplete() {
    const { setUser } = useContext(UserContext)

    useEffect(() => {
        const userJSON = window.sessionStorage.getItem("user")
        if (userJSON) {
            const user = JSON.parse(userJSON)
            setUser(user)
        }
    }, [])
    
    return (
        <Elements stripe={stripePromise}>
            <PaymentResponse />
        </Elements>
    );
}

export default PaymentComplete