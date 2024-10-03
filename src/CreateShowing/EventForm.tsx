import { useState } from "react"
import { FoundFilmDetails } from "../../types"
import "./EventForm.css"

function EventForm({filmDetails}: {filmDetails: FoundFilmDetails}) {
    function getCurrentDate() {
        const date = new Date().toLocaleDateString()
        return date.slice(-4) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2)
    }

    const currentDate = getCurrentDate()
    const [dateInput, setDateInput] = useState(currentDate)

    function handleDateInput(e: React.ChangeEvent<HTMLInputElement>) {
        const dateRegex = /\d\d-\d\d-\d\d/
        if (dateRegex.test(e.target.value)) {
            setDateInput(e.target.value)
        }
    }

    return <>
        <h1>Fill out events details here:</h1>
        <form id="event-form">
            <div className="form-element">
                <label htmlFor="film-name">Film:</label>
                <input id="film-name" value={filmDetails.title} type="text" readOnly/>
            </div>
            <div className="form-element">
                <label htmlFor="date">Date:</label>
                <input id="date" onChange={handleDateInput} value={dateInput} type="date" />
            </div>
        </form>
    </>
}

export default EventForm