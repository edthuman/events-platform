import { useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Loading from "../Loading";
import ReturnLinks from "./ReturnLinks";
import { useSearchParams } from "react-router-dom";
import { addAttendee } from "../../server/firestore-methods";
import FirebaseContext from "../../hooks/FirebaseContext";
import UserContext from "../../hooks/UserContext";

const successIcon = (
    <svg
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.4695 0.232963C15.8241 0.561287 15.8454 1.1149 15.5171 1.46949L6.14206 11.5945C5.97228 11.7778 5.73221 11.8799 5.48237 11.8748C5.23253 11.8698 4.99677 11.7582 4.83452 11.5681L0.459523 6.44311C0.145767 6.07557 0.18937 5.52327 0.556912 5.20951C0.924454 4.89575 1.47676 4.93936 1.79051 5.3069L5.52658 9.68343L14.233 0.280522C14.5613 -0.0740672 15.1149 -0.0953599 15.4695 0.232963Z"
            fill="white"
        />
    </svg>
);

const errorIcon = (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.25628 1.25628C1.59799 0.914573 2.15201 0.914573 2.49372 1.25628L8 6.76256L13.5063 1.25628C13.848 0.914573 14.402 0.914573 14.7437 1.25628C15.0854 1.59799 15.0854 2.15201 14.7437 2.49372L9.23744 8L14.7437 13.5063C15.0854 13.848 15.0854 14.402 14.7437 14.7437C14.402 15.0854 13.848 15.0854 13.5063 14.7437L8 9.23744L2.49372 14.7437C2.15201 15.0854 1.59799 15.0854 1.25628 14.7437C0.914573 14.402 0.914573 13.848 1.25628 13.5063L6.76256 8L1.25628 2.49372C0.914573 2.15201 0.914573 1.59799 1.25628 1.25628Z"
            fill="white"
        />
    </svg>
);

const infoIcon = (
    <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 1.5H4C2.61929 1.5 1.5 2.61929 1.5 4V10C1.5 11.3807 2.61929 12.5 4 12.5H10C11.3807 12.5 12.5 11.3807 12.5 10V4C12.5 2.61929 11.3807 1.5 10 1.5ZM4 0C1.79086 0 0 1.79086 0 4V10C0 12.2091 1.79086 14 4 14H10C12.2091 14 14 12.2091 14 10V4C14 1.79086 12.2091 0 10 0H4Z"
            fill="white"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.25 7C5.25 6.58579 5.58579 6.25 6 6.25H7.25C7.66421 6.25 8 6.58579 8 7V10.5C8 10.9142 7.66421 11.25 7.25 11.25C6.83579 11.25 6.5 10.9142 6.5 10.5V7.75H6C5.58579 7.75 5.25 7.41421 5.25 7Z"
            fill="white"
        />
        <path
            d="M5.75 4C5.75 3.31075 6.31075 2.75 7 2.75C7.68925 2.75 8.25 3.31075 8.25 4C8.25 4.68925 7.68925 5.25 7 5.25C6.31075 5.25 5.75 4.68925 5.75 4Z"
            fill="white"
        />
    </svg>
);

const statusDetails = {
    succeeded: {
        text: "Payment successful",
        iconColor: "#30B130",
        icon: successIcon,
    },
    processing: {
        text: "Processing payment",
        iconColor: "#6D6E78",
        icon: infoIcon,
    },
    requires_payment_method: {
        text: "Your payment was unsuccessful, please try again",
        iconColor: "#DF1B41",
        icon: errorIcon,
    },
    default: {
        text: "Something went wrong, please try again",
        iconColor: "#DF1B41",
        icon: errorIcon,
    },
    canceled: {
        text: "Payment was cancelled, please try again",
        iconColor: "#DF1B41",
        icon: errorIcon,
    },
    loading: {
        text: "Loading",
        iconColor: "#6D6E78",
        icon: infoIcon,
    },
};

function PaymentResponse() {
    const [status, setStatus] = useState("loading");
    const stripe = useStripe();
    const queries = useSearchParams()[0];
    const showingId = queries.get("showing");
    const firebase = useContext(FirebaseContext);
    const {
        user: { email },
    } = useContext(UserContext);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            if (!stripe) {
                return;
            }

            const clientSecret = new URLSearchParams(
                window.location.search
            ).get("payment_intent_client_secret");

            if (!clientSecret) {
                setError("Error: Payment query missing from URL");
                return;
            }

            const { paymentIntent } = await stripe.retrievePaymentIntent(
                clientSecret
            );
            if (!paymentIntent) {
                setError("Could not retrieve payment details");
                return;
            }

            if (!showingId) {
                setError("No showing query given in URL");
                return;
            }

            if (paymentIntent.status === "succeeded") {
                const response = await addAttendee(firebase, email, showingId);
                if (response.error) {
                    setError("An error occurred whilst added you to the event");
                    return;
                }
            }

            setStatus(paymentIntent.status);
        })();
    }, [stripe]);

    return stripe ? (
        <>
            <h1 className="text-3xl my-6">{statusDetails[status].text}</h1>
            {error ? <p>{error}</p> : null}
            <div
                style={{
                    backgroundColor: statusDetails[status].iconColor,
                }}
                className="rounded-lg py-1 flex justify-center mb-8 w-11/12 mx-auto"
                >
                {statusDetails[status].icon}
            </div>
            <ReturnLinks showingId={showingId} />
        </>
    ) : (
        <Loading />
    );
}

export default PaymentResponse;
