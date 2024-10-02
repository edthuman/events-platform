import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FirebaseContext from "../../hooks/FirebaseContext";
import { doc } from "@firebase/firestore";
import { getDoc } from "firebase/firestore";
import { getDate, getTime } from "../../utils/datetime-utils";
import "./SingleShowing.css"

const omdbKey = import.meta.env.VITE_OMBD_KEY;

function SingleShowing() {
    const showingId = useParams().showing_id;
    const [showing, setShowing] = useState<any>(null);
    const [movieDetails, setMovieDetails] = useState<any>(null);
    const database = useContext(FirebaseContext);

    async function getFilmDetails() {
        const response: any = await axios.get(
            `https://www.omdbapi.com/?apikey=${omdbKey}&t=${"Iron Giant"}`
        );

        const { Director, Runtime, Genre, Plot, Rated, Year, imdbID } =
            response.data;
        setMovieDetails({
            director: Director,
            runtime: Runtime,
            genre: Genre,
            plot: Plot,
            rating: Rated,
            year: Year,
            imdbId: imdbID,
        });
    }

    async function getShowingDetails() {
        const docRef = doc(database, `showings/${showingId}`);

        const snapshot = await getDoc(docRef);
        const showingData = snapshot.data();

        setShowing({
            id: showingData.id,
            ...showingData,
        });
    }

    useEffect(() => {
        getShowingDetails();
        getFilmDetails();
    }, []);

    return showing && movieDetails ? (
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
    ) : (
        <h1>Loading...</h1>
    );
}

export default SingleShowing;
