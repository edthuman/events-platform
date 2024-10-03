import { useState } from "react";
import { FoundFilmDetails } from "../../types";
import FilmPreview from "./FilmPreview";
import { findFilmDetails, handleFilmNameInput } from "./event-handlers";

const omdbKey = import.meta.env.VITE_OMDB_KEY;

function CreateShowing() {
    const [filmNameInput, setFilmNameInput] = useState("");
    const [filmDetails, setFilmDetails] = useState<{} | FoundFilmDetails>({});
    const [error, setError] = useState<string>("")
    const [isSearchRequired, setIsSearchRequired] = useState(true)
    
    function handleFilmFound() {
        setIsSearchRequired(false)
    }

    return isSearchRequired ? (
        <>
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
                    <button onClick={handleFilmFound}>Yes</button>
                    <button onClick={() => console.log("No")}>No</button>
                </>
            ) : null }
        </>
    ) : (
    <>
        <h1>You are seeing:</h1>
        <FilmPreview filmDetails={filmDetails} />
    </>
    )
}

export default CreateShowing;
