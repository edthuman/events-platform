import { useState } from "react"
import "./EventForm.css"
import { handleDateInput, handleEventFormSubmit, handleTextInput, handleTimeInput } from "./event-handlers"
import { getCurrentDate } from "./utils"
import { FilmPreviewDetails } from "../../server/omdb-types"

function EventForm({filmDetails}: {filmDetails: FilmPreviewDetails}) {
    const currentDate = getCurrentDate()
    const [eventNameInput, setEventNameInput] = useState("")
    const [descriptionInput, setDescriptionInput] = useState("")
    const [dateInput, setDateInput] = useState(currentDate)
    const [timeInput, setTimeInput] = useState("00:00")

    return <>
        <h1>Fill out events details here:</h1>
        <form id="event-form" onSubmit={handleEventFormSubmit}>
            <div className="form-element">
                <label htmlFor="event-name">Name of Event:</label>
                <input id="event-name" onChange={(e) => handleTextInput(e, setEventNameInput)} value={eventNameInput} type="text" placeholder="My Event"/>
            </div>
            <div className="form-element">
                <label htmlFor="description">Event Description:</label>
                <input id="description" onChange={(e) => handleTextInput(e, setDescriptionInput)} value={descriptionInput} type="text" placeholder="Description of event"/>
            </div>
            <div className="form-element">
                <label htmlFor="film-name">Film:</label>
                <input id="film-name" value={filmDetails.title} type="text" readOnly/>
            </div>
            <div className="form-element">
                <label htmlFor="date">Date:</label>
                <input id="date" onChange={(e) => handleDateInput(e, setDateInput)} value={dateInput} type="date" min={currentDate} max={"2099-12-31"}/>
            </div>
            <div className="form-element">
                <label htmlFor="time">Time:</label>
                <input type="time" value={timeInput} onChange={(e) => handleTimeInput(e, setTimeInput)}/>
            </div>
        </form>
    </>
}

export default EventForm