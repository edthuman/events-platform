import { useState } from "react";
import { findFilmDetails, handleFilmFound, handleFilmNameInput } from "./event-handlers";
import FilmPreview from "./FilmPreview";
import { BooleanStateSetter, FoundFilmDetails, SetFilmDetails } from "../../types";

const omdbKey = import.meta.env.VITE_OMDB_KEY;

function FilmSearchForm({filmDetails, setFilmDetails, setIsSearchRequired} : {filmDetails: FoundFilmDetails, setFilmDetails: SetFilmDetails, setIsSearchRequired: BooleanStateSetter}) {
    const [filmNameInput, setFilmNameInput] = useState("");
    const [error, setError] = useState<string>("")

    return <>
        <h1>Start A New Event!</h1>
        <p>Search by film name:</p>
        <form onSubmit={(e) => findFilmDetails(e, filmNameInput, setError, setFilmDetails, omdbKey)}>
            <label>Name:</label>
            <input
                type="text"
                onChange={(e) => handleFilmNameInput(e, setFilmNameInput)}
                value={filmNameInput}
            />
            <button type="submit">Find Film</button>
        </form>
        {error ? <p>{error}</p> : null}
        {Object.keys(filmDetails).length ? (
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