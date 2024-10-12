import { Link } from "react-router-dom"
import { Showing } from "../../server/firestore-types"
import { FilmDetails } from "../../server/omdb-types"
import { getDate, getTime } from "../../utils/datetime-utils"

function ShowingDetails({showing, filmDetails}: {showing: Showing, filmDetails: FilmDetails}) {
    return <>
        <h2>{showing.name}</h2>
        <p>{getDate(showing.startDate)}</p>
        <p>{getTime(showing.startDate)}</p>
        <img src={`${showing.poster}`} alt={`Poster for ${filmDetails.title}`} />
        <p>{showing.description}</p>
        <h2>Movie Details</h2>
        <p>
            {filmDetails.title} ({filmDetails.year})
        </p>
        <p>Rated: {filmDetails.rating}</p>
        <p>Runtime: {filmDetails.runtime}</p>
        <p>Directed by: {filmDetails.director}</p>
        <p>Genre(s): {filmDetails.genre}</p>
        <p>Plot: {filmDetails.plot}</p>
        <Link
            to={`https://www.imdb.com/title/${showing.imdbId}`}
            target="_blank"
        >
            Read more about the film on IMDb
        </Link>
    </>
}

export default ShowingDetails