import { BooleanStateSetter, SetFilmDetails, StringStateSetter } from "../../../types"
import { findFilmDetails, handleTextInput } from "../event-handlers"

function NameSearch({filmNameInput, setFilmDetails, omdbKey, setIsLoading, setFilmNameInput} : {filmNameInput: string, setFilmDetails: SetFilmDetails, omdbKey: string, setIsLoading: BooleanStateSetter, setFilmNameInput: StringStateSetter}) {
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
        </form>
    </>
}

export default NameSearch