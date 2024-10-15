import { useContext, useEffect } from "react";
import Stripe from "stripe";
import CheckoutForm from "../CheckoutForm";
import StripeContext from "../../hooks/StripeContext";
const stripe = new Stripe(import.meta.env.VITE_STRIPE_KEY);

function Payment({ showing }: { showing: any }) {
    const { clientSecret, setClientSecret } = useContext(StripeContext);

    useEffect(() => {
        (async () => {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: showing.price * 100,
                currency: "gbp",
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            const secret = paymentIntent.client_secret;
            setClientSecret(secret);
        })();
    }, []);

    return clientSecret ? (
        <>
            <CheckoutForm showing={showing} />
        </>
    ) : (
        <p>Loading CLIENT SECRET</p>
    );
}

export default Payment;
