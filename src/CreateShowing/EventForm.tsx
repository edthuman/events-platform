import { FoundFilmDetails } from "../../types"
import FilmPreview from "./FilmPreview"

function EventForm({filmDetails}: {filmDetails: FoundFilmDetails}) {
    return <>
    <h1>Fill out events details here:</h1>
    <FilmPreview filmDetails={filmDetails}/>
    </>
    return 
}

export default EventForm