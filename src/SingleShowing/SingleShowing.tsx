import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FirebaseContext from "../../hooks/FirebaseContext";
import { getDate, getTime } from "../../utils/datetime-utils";
import { getShowingDetails } from "../../server/firestore-methods"
import { getFilmDetails } from "../../server/omdb-methods"
import "./SingleShowing.css"

const omdbKey = import.meta.env.VITE_OMBD_KEY;

function SingleShowing() {
    const showingId = useParams().showing_id;
    const [showing, setShowing] = useState<any>(null);
    const [movieDetails, setMovieDetails] = useState<any>(null);
    const firestore = useContext(FirebaseContext);

    useEffect(() => {
        (async ()=>{
            const showingDetails = await getShowingDetails(firestore, showingId);
            setShowing(showingDetails)
        })()
    }, []);

    useEffect(()=>{
        (async()=>{
            if (showing) {
                const filmDetails = await getFilmDetails(omdbKey, showing.film)
                setMovieDetails(filmDetails)
            }
        })()
    }, [showing])

    return !showing || !movieDetails ? (
        <h1>Loading...</h1>
    ) : (
        showing.error ? (
            <h1>{showing.error}</h1>
    ) : (
        movieDetails.error ? (
            <h1>{movieDetails.error}</h1>
        ) : (
            <>
                <h1>{showing.name}</h1>
                <p>{getDate(showing.datetime)}</p>
                <p>{getTime(showing.datetime)}</p>
                <img src={`${showing.poster}`} alt={`Poster for ${showing.film}`} />
                <p>{showing.description}</p>
                <h2>Movie Details</h2>
                <p>
                    {showing.film} ({movieDetails.year})
                </p>
                <p>Rated: {movieDetails.rating}</p>
                <p>Runtime: {movieDetails.runtime}</p>
                <p>Directed by: {movieDetails.director}</p>
                <p>Genre(s): {movieDetails.genre}</p>
                <p>Plot: {movieDetails.plot}</p>
                <a
                    href={`https://www.imdb.com/title/${movieDetails.imdbId}`}
                    target="_blank"
                >
                    Read more about the film on IMDb
                </a>
            </>
    )))
}

export default SingleShowing;
