import { useState } from "react"
import { FoundFilmDetails } from "../../types"
import "./EventForm.css"
import { handleDateInput } from "./event-handlers"

function EventForm({filmDetails}: {filmDetails: FoundFilmDetails}) {
    function getCurrentDate() {
        const date = new Date().toLocaleDateString()
        return date.slice(-4) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2)
    }

    const currentDate = getCurrentDate()
    const [dateInput, setDateInput] = useState(currentDate)

    return <>
        <h1>Fill out events details here:</h1>
        <form id="event-form">
            <div className="form-element">
                <label htmlFor="film-name">Film:</label>
                <input id="film-name" value={filmDetails.title} type="text" readOnly/>
            </div>
            <div className="form-element">
                <label htmlFor="date">Date:</label>
                <input id="date" onChange={(e) => handleDateInput(e, setDateInput)} value={dateInput} type="date" min={currentDate} max={"2999-12-31"}/>
            </div>
        </form>
    </>
}

export default EventForm