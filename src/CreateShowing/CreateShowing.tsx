import { useState } from "react";
import FilmSearchForm from "./FilmSearchForm";
import EventForm from "./EventForm";
import { FilmPreviewResponse } from "../../server/omdb-types";

function CreateShowing() {
    // TypeScript error on EventForm component can be ignored - isSearchRequired is only set to true when filmDetails are of type FilmPreviewDetails
    const [filmDetails, setFilmDetails] = useState<FilmPreviewResponse>({ error: "" });
    const [isSearchRequired, setIsSearchRequired] = useState(true)
    const [showingId, setShowingId] = useState("")

    return isSearchRequired ? (
        <FilmSearchForm filmDetails={filmDetails} setFilmDetails={setFilmDetails} setIsSearchRequired={setIsSearchRequired}/>
    ) : (
        showingId === "" ? (
    <>
        <EventForm filmDetails={filmDetails} setShowingId={setShowingId}/>
    </>
    ) : ( 
        <h1>Event Posted!</h1>
    )
    )
}

export default CreateShowing;
