import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FirebaseContext from "../../hooks/FirebaseContext";
import { getSingleShowing } from "../../server/firestore-methods";
import { getFilmDetails } from "../../server/omdb-methods";
import "./SingleShowing.css";
import { FilmDetailsResponse } from "../../server/omdb-types";
import ShowingDetails from "./ShowingDetails";
import Loading from "../Loading";
import AttendShowing from "./AttendShowing";
import { checkShowingInCalendar } from "../../server/google-methods";
import UserContext from "../../hooks/UserContext";
import ErrorMessage from "../ErrorMessage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import CheckoutForm from "./CheckoutForm";
import * as uuid from 'uuid';

const omdbKey = import.meta.env.VITE_OMDB_KEY;
const stripe = new Stripe(import.meta.env.VITE_STRIPE_KEY);
const stripePromise = loadStripe(
    "pk_test_51Q9nghKK7ykYcCh0ywwIIxPTONKVi1uxYPrboXY4LQfSGkIs9Mj0vSwWsmGeFhYMtwDhCk8B0ZWsZKXdVcXBjSYQ00juMM9MCx"
);

function SingleShowing() {
    // TypeScript error on ShowingDetails component can be ignored - filmDetails will be of type FilmDetails whenever this renders
    const showingId = useParams().showing_id;
    const [showing, setShowing] = useState<any>(null);
    const [filmDetails, setFilmDetails] = useState<FilmDetailsResponse>({
        error: "",
    });
    const firestore = useContext(FirebaseContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isNotInCalendar, setIsNotInCalendar] = useState(true);
    const [calendarError, setCalendarError] = useState("");
    const { user } = useContext(UserContext);
    const { token } = user;
    const [isPaying, setIsPaying] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [donation, setDonation] = useState("")

    const appearance = {
        theme: "stripe",
    };
    const loader = "auto";

    useEffect(() => {
        (async () => {
            const showingDetails = await getSingleShowing(firestore, showingId);
            setShowing(showingDetails);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (showing) {
                const filmDetails = await getFilmDetails(
                    omdbKey,
                    showing.imdbId
                );
                setFilmDetails(filmDetails);

                if (user.isGoogleAccount) {
                    checkShowingInCalendar(
                        showing,
                        token,
                        setIsNotInCalendar,
                        setIsLoading,
                        setCalendarError
                    );
                }
            }
            setIsLoading(false)
        })();
    }, [showing]);

    useEffect(() => {
        (async() => {
            if (isPaying) {
                let idempotencyKey = ""
                const currentKey = window.sessionStorage.getItem(`${showing.id}_key`)
                if (currentKey) {
                    idempotencyKey = currentKey
                } else {
                    const key = uuid.v4()
                    window.sessionStorage.setItem(`${showing.id}_key`, key)
                    idempotencyKey = key
                }

                if (showing.price === "any"){
                    const paymentIntent = await stripe.paymentIntents.create(
                        {
                            amount: Number(donation) * 100,
                            currency: "gbp",
                            automatic_payment_methods: {
                                enabled: true,
                            },
                        },
                        { 
                            idempotencyKey 
                        }
                    );
                    
                    const secret = paymentIntent.client_secret;
                    setClientSecret(secret);
                } else if (showing.price !== 0) {
                    const paymentIntent = await stripe.paymentIntents.create(
                        {
                            amount: showing.price * 100,
                            currency: "gbp",
                            automatic_payment_methods: {
                                enabled: true,
                            },
                        },
                        { 
                            idempotencyKey 
                        }
                    );
                    
                    const secret = paymentIntent.client_secret;
                    setClientSecret(secret);
                }
            }
        }
        )()
        }, [isPaying])

    return !showing || !filmDetails || isLoading ? (
        <Loading />
    ) : showing.error ? (
        <ErrorMessage error={showing.error} />
    ) : filmDetails.error ? (
        <ErrorMessage error={filmDetails.error} />
    ) : calendarError ? (
        <ErrorMessage error={calendarError} />
    ) : isPaying && clientSecret ? (
        <Elements
            options={{ clientSecret, appearance, loader }}
            stripe={stripePromise}
        >
            <CheckoutForm showing={showing} donation={donation}/>
        </Elements>
    ) : (
        <>
            <AttendShowing
                showing={showing}
                isNotInCalendar={isNotInCalendar}
                setIsPaying={setIsPaying}
                donation={donation}
                setDonation={setDonation}

            />
            <ShowingDetails showing={showing} filmDetails={filmDetails} />
        </>
    );
}

export default SingleShowing;
