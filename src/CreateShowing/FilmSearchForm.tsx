import { useState } from "react";
import { findFilmDetails, handleFilmFound, handleTextInput } from "./event-handlers";
import FilmPreview from "./FilmPreview";
import { BooleanStateSetter, SetFilmDetails } from "../../types";
import { FilmPreviewResponse } from "../../server/omdb-types";

const omdbKey = import.meta.env.VITE_OMDB_KEY;

function FilmSearchForm({filmDetails, setFilmDetails, setIsSearchRequired} : {filmDetails: FilmPreviewResponse, setFilmDetails: SetFilmDetails, setIsSearchRequired: BooleanStateSetter}) {
    // TypeScript error on FilmPreview component can be ignored - filmDetails having more than 1 key means it has type FilmPreviewDetails
    const [filmNameInput, setFilmNameInput] = useState("");

    return <>
        <h1>Start A New Event!</h1>
        <p>Search by film name:</p>
        <form onSubmit={(e) => findFilmDetails(e, filmNameInput, setFilmDetails, omdbKey)}>
            <label htmlFor="film-name">Name:</label>
            <input
                id="film-name"
                type="text"
                onChange={(e) => handleTextInput(e, setFilmNameInput)}
                value={filmNameInput}
            />
            <button type="submit">Find Film</button>
        </form>
        {filmDetails.error ? <p>{filmDetails.error}</p> : null}
        {Object.keys(filmDetails).length > 1 ? (
                <>
                    <FilmPreview filmDetails={filmDetails}/>
                    <p>Are these details correct?</p>
                    <button onClick={() => handleFilmFound(setIsSearchRequired)}>Yes</button>
                    <button onClick={() => console.log("No")}>No</button>
                </>
        ) : null }
    </>
}

export default FilmSearchForm