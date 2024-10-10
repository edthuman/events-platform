import { useState } from "react";
import { BooleanStateSetter, SetFilmDetails } from "../../../types"
import { findFilmDetails, handleTextInput } from "../event-handlers"

function SearchForm({setFilmDetails, omdbKey, setIsLoading, setIsSearchingByName} : {setFilmDetails: SetFilmDetails, omdbKey: string, setIsLoading: BooleanStateSetter, setIsSearchingByName: BooleanStateSetter}) {
    const [filmNameInput, setFilmNameInput] = useState("");

    return <>
        <p>Search by film name:</p>
        <form
            onSubmit={(e) =>
                findFilmDetails(
                    e,
                    filmNameInput,
                    setFilmDetails,
                    omdbKey,
                    setIsLoading
                )
            }
        >
            <label htmlFor="film-name">Name:</label>
            <input
                id="film-name"
                type="text"
                onChange={(e) => handleTextInput(e, setFilmNameInput)}
                value={filmNameInput}
            />
            <button type="submit">Find Film</button>
            <button type="button" onClick={() => setIsSearchingByName(false)}>Search by IMDb ID</button>
        </form>
    </>
}

export default SearchForm