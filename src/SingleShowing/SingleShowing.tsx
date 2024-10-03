import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FirebaseContext from "../../hooks/FirebaseContext";
import { getDate, getTime } from "../../utils/datetime-utils";
import { getSingleShowing } from "../../server/firestore-methods";
import { getFilmDetails } from "../../server/omdb-methods";
import "./SingleShowing.css";

const omdbKey = import.meta.env.VITE_OMBD_KEY;

function SingleShowing() {
    const showingId = useParams().showing_id;
    const [showing, setShowing] = useState<any>(null);
    const [filmDetails, setFilmDetails] = useState<any>(null);
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
                const filmDetails = await getFilmDetails(omdbKey, showing.film);
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
        <>
            <h1>{showing.name}</h1>
            <p>{getDate(showing.datetime)}</p>
            <p>{getTime(showing.datetime)}</p>
            <img src={`${showing.poster}`} alt={`Poster for ${showing.film}`} />
            <p>{showing.description}</p>
            <h2>Movie Details</h2>
            <p>
                {showing.film} ({filmDetails.year})
            </p>
            <p>Rated: {filmDetails.rating}</p>
            <p>Runtime: {filmDetails.runtime}</p>
            <p>Directed by: {filmDetails.director}</p>
            <p>Genre(s): {filmDetails.genre}</p>
            <p>Plot: {filmDetails.plot}</p>
            <a
                href={`https://www.imdb.com/title/${filmDetails.imdbId}`}
                target="_blank"
            >
                Read more about the film on IMDb
            </a>
        </>
    );
}

export default SingleShowing;
