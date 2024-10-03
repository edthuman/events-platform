import { useState } from "react"
import { findFilm } from "../server/omdb-methods"

function CreateShowing() {
    const [filmNameInput, setFilmNameInput] = useState("")

    function handleFilmNameInput(e: React.ChangeEvent<HTMLInputElement>) {
        setFilmNameInput(e.target.value)
    }

    return <>
        <h1>Start A New Event!</h1>
        <form onSubmit={(e)=>findFilm(e)}>
            <label>
                    Which film will be showing?
            </label>
            <input type="text" onChange={(e)=>handleFilmNameInput(e)} value={filmNameInput}/>
            <button type="submit">
                Find Film
            </button>
        </form>
    </>
}

export default CreateShowing