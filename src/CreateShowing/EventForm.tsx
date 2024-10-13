import { useContext, useState } from "react"
import "./EventForm.css"
import { handleDateInput, handleEventFormSubmit, handlePriceInput, handlePriceTypeInput, handleTimeInput } from "./event-handlers"
import { getCurrentDate } from "./utils"
import { FilmPreviewDetails } from "../../server/omdb-types"
import FirebaseContext from "../../hooks/FirebaseContext"
import { BooleanStateSetter, StringStateSetter } from "../../types"
import { handleTextInput } from "../event-handler"

function EventForm({filmDetails, setShowingId, setIsPosting}: {filmDetails: FilmPreviewDetails, setShowingId: StringStateSetter, setIsPosting: BooleanStateSetter}) {
    const currentDate = getCurrentDate()
    const [eventNameInput, setEventNameInput] = useState("")
    const [descriptionInput, setDescriptionInput] = useState("")
    const [dateInput, setDateInput] = useState(currentDate)
    const [timeInput, setTimeInput] = useState("00:00")
    const [durationInput, setDurationInput] = useState("00:30")
    const [priceType, setPriceType] = useState("free")
    const [priceInput, setPriceInput] = useState("")
    const { title, imdbId, poster } = filmDetails
    const firestore = useContext(FirebaseContext)
    const [error, setError] = useState("")

    return <>
        <h2>Fill out events details here:</h2>
        <form id="event-form" onSubmit={(e)=>handleEventFormSubmit(e, title, imdbId, poster, firestore, setError, setShowingId, setIsPosting)}>
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
                <input id="film-name" value={title} type="text" readOnly/>
            </div>
            <div className="form-element">
                <label htmlFor="date">Date:</label>
                <input id="date" onChange={(e) => handleDateInput(e, setDateInput)} value={dateInput} type="date" min={currentDate} max={"2099-12-31"}/>
            </div>
            <div className="form-element">
                <label htmlFor="time">Start Time:</label>
                <input id="time" type="time" value={timeInput} onChange={(e) => handleTimeInput(e, setTimeInput)}/>
            </div>
            <div className="form-element">
                <label htmlFor="duration">Event Duration:</label>
                <input id="duration" type="time" value={durationInput} onChange={(e) => handleTimeInput(e, setDurationInput)} min="00:30"/>
            </div>
            <label htmlFor="price-type">Price:</label>
            <select value={priceType} id="price-type" onChange={e => handlePriceTypeInput(e, setPriceType)}>
                <option value={"free"}>Free</option>
                <option value={"optional"}>Pay what you like</option>
                <option value={"set"}>Set price</option>
            </select>
            {priceType === "set" ? (
                <div className="form-element">
                    <label htmlFor="price">Ticket Price (£):</label>
                    <input id="price" value={priceInput} type="text" placeholder="0" onChange={e => handlePriceInput(e, setPriceInput)}/>
                </div>
                ) : null}
            <button type="submit">Create event</button>
        </form>
        { error ? <p>{error}</p> : null}
    </>
}

export default EventForm