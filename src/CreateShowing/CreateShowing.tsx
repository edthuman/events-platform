import { useState } from "react";
import { findFilm } from "../../server/omdb-methods";
import { FoundFilmDetails } from "../../types";
import FilmPreview from "./FilmPreview";

const omdbKey = import.meta.env.VITE_OMDB_KEY;

function CreateShowing() {
    const [filmNameInput, setFilmNameInput] = useState("");
    const [filmDetails, setFilmDetails] = useState<{} | FoundFilmDetails>({});
    const [error, setError] = useState<string>("")

    function handleFilmNameInput(e: React.ChangeEvent<HTMLInputElement>) {
        setFilmNameInput(e.target.value);
    }

    async function findFilmDetails(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (filmNameInput === "") {
            setError("No name given")
            setFilmDetails({})
            return
        }

        const fetchedFilmDetails = await findFilm(omdbKey, filmNameInput);

        if (fetchedFilmDetails.error) {
            setError(fetchedFilmDetails.error)
            setFilmDetails({})
            return
        }

        setFilmDetails(fetchedFilmDetails);
        setError("")
    }
    
    return (
        <>
            <h1>Start A New Event!</h1>
            <p>Search by film name:</p>
            <form onSubmit={(e) => findFilmDetails(e)}>
                <label>Name:</label>
                <input
                    type="text"
                    onChange={(e) => handleFilmNameInput(e)}
                    value={filmNameInput}
                />
                <button type="submit">Find Film</button>
            </form>
            {error ? <p>{error}</p> : null}
            {Object.keys(filmDetails).length ? (
                <>
                    <FilmPreview filmDetails={filmDetails}/>
                    <p>Are these correct?</p>
                    <button onClick={() => console.log("Yes")}>Yes</button>
                    <button onClick={() => console.log("No")}>No</button>
                </>
            ) : null }
        </>
    );
}

export default CreateShowing;
