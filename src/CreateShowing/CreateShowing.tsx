import { useState } from "react";
import { FoundFilmDetails } from "../../types";
import FilmSearchForm from "./FilmSearchForm";
import EventForm from "./EventForm";

function CreateShowing() {
    const [filmDetails, setFilmDetails] = useState<FoundFilmDetails>({});
    const [isSearchRequired, setIsSearchRequired] = useState(true)

    return isSearchRequired ? (
        <FilmSearchForm filmDetails={filmDetails} setFilmDetails={setFilmDetails} setIsSearchRequired={setIsSearchRequired}/>
    ) : (
    <>
        <EventForm filmDetails={filmDetails}/>
    </>
    )
}

export default CreateShowing;
