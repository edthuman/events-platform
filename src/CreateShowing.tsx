import { useState } from "react"

function CreateShowing() {
    const [filmNameInput, setFilmNameInput] = useState("")

    function handleFilmNameInput(e: React.ChangeEvent<HTMLInputElement>) {
        setFilmNameInput(e.target.value)
    }

    function findFilm(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
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