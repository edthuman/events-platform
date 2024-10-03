import { useState } from "react";
import { FoundFilmDetails } from "../../types";
import FilmPreview from "./FilmPreview";
import FilmSearchForm from "./FilmSearchForm";

function CreateShowing() {
    const [filmDetails, setFilmDetails] = useState<{} | FoundFilmDetails>({});
    const [isSearchRequired, setIsSearchRequired] = useState(true)

    return isSearchRequired ? (
        <FilmSearchForm filmDetails={filmDetails} setFilmDetails={setFilmDetails} setIsSearchRequired={setIsSearchRequired}/>
    ) : (
    <>
        <h1>You are seeing:</h1>
        <FilmPreview filmDetails={filmDetails} />
    </>
    )
}

export default CreateShowing;
