import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FirebaseContext from "../../hooks/FirebaseContext";
import { getSingleShowing } from "../../server/firestore-methods";
import { getFilmDetails } from "../../server/omdb-methods";
import "./SingleShowing.css";
import { FilmDetailsResponse } from "../../server/omdb-types";
import ShowingDetails from "./ShowingDetails";

const omdbKey = import.meta.env.VITE_OMDB_KEY;

function SingleShowing() {
    const showingId = useParams().showing_id;
    const [showing, setShowing] = useState<any>(null);
    const [filmDetails, setFilmDetails] = useState<FilmDetailsResponse>({ error: "" });
    const firestore = useContext(FirebaseContext);

    useEffect(() => {
        (async () => {
            const showingDetails = await getSingleShowing(
                firestore,
                showingId
            );
            setShowing(showingDetails);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (showing) {
                const filmDetails = await getFilmDetails(omdbKey, showing.imdbId);
                setFilmDetails(filmDetails);
            }
        })();
    }, [showing]);
    
    return !showing || !filmDetails ? (
        <h1>Loading...</h1>
    ) : showing.error ? (
        <h1>{showing.error}</h1>
    ) : filmDetails.error ? (
        <h1>{filmDetails.error}</h1>
    ) : (
        <ShowingDetails showing={showing} filmDetails={filmDetails}/>
    );
}

export default SingleShowing;