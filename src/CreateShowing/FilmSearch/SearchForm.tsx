import { useState } from "react";
import { BooleanStateSetter, SetFilmDetails } from "../../../types"
import { findFilmDetails, handleTextInput } from "../event-handlers"

function SearchForm({setFilmDetails, omdbKey, setIsLoading} : {setFilmDetails: SetFilmDetails, omdbKey: string, setIsLoading: BooleanStateSetter}) {
    const [isNameSearch, setIsNameSearch] = useState(true)
    const [textInput, setTextInput] = useState("");

    return <>
        <p>Search by {isNameSearch ? "name" : "IMDb ID"}:</p>
        <form
            onSubmit={(e) =>
                findFilmDetails(
                    e,
                    textInput,
                    setFilmDetails,
                    omdbKey,
                    setIsLoading,
                    isNameSearch
                )
            }
        >
            
            <label htmlFor={`film-${isNameSearch ? "name" : "id"}`}>{isNameSearch ? "Name" : "IMDb ID"}:</label>
            <input
                id={`film-${isNameSearch ? "name" : "id"}`}
                type="text"
                onChange={(e) => handleTextInput(e, setTextInput)}
                value={textInput}
            />
            <button type="submit">Find Film</button>
            <button type="button" onClick={() => setIsNameSearch((currValue: boolean) => !currValue)}>Search by {isNameSearch ? "IMDb ID": "film name"}</button>
        </form>
    </>
}

export default SearchForm