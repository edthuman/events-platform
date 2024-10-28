import { useContext, useState } from "react";
import {
    handleDateInput,
    handlePriceTypeInput,
    handleTimeInput,
} from "../event-handlers";
import FirebaseContext from "../../hooks/FirebaseContext";
import { BooleanStateSetter } from "../../types";
import { handlePriceInput, handleTextInput } from "../event-handlers";
import { Showing } from "../../server/firestore-types";
import {
    getCurrentDate,
    getDuration,
    getFullDate,
    getTime,
} from "../../utils/datetime-utils";
import { handleEventEditSubmit } from "./event-handlers";
import { Link } from "react-router-dom";

function EventDetailsForm({
    showing,
    setIsEditing,
}: {
    showing: Showing;
    setIsEditing: BooleanStateSetter;
}) {
    const currentDate = getCurrentDate();
    const { name, film, description, price, startDate, endDate } = showing;
    const [eventNameInput, setEventNameInput] = useState(name);
    const [descriptionInput, setDescriptionInput] = useState(description);
    const startDay = getFullDate(startDate);
    const [dateInput, setDateInput] = useState(startDay);
    const startTime = getTime(startDate);
    const [timeInput, setTimeInput] = useState(startTime);
    const initialDuration = getDuration(startDate, endDate);
    const [durationInput, setDurationInput] = useState(initialDuration);
    const initialPriceType =
        price === "any" ? "optional" : price === 0 ? "free" : "set";
    const [priceType, setPriceType] = useState(initialPriceType);
    const initialPrice = price === "any" || price === 0 ? "0" : String(price);
    const [priceInput, setPriceInput] = useState(initialPrice);
    const firestore = useContext(FirebaseContext);
    const [isPosting, setIsPosting] = useState(false);
    const [hasPosted, setHasPosted] = useState(false)
    const [error, setError] = useState("");
    const formElementStyle = "flex mb-4 self-center w-full";
    const labelStyle = "flex text-lg sm:text-xl w-1/2 self-center justify-center";
    const inputStyle = "bg-off_white sm:text-lg text-black w-1/2 px-2 py-1 text-center";
    const buttonStyle = `sm:text-xl w-5/12 sm:4/12 mx-auto mt-2 mb-3 xl:mb-5 hover:text-grey ${
        isPosting ? "text-grey" : "text-off_white"
    }`;
    const buttonTextStyle = "py-3 xl:py-4 text-lg xl:text-xl"
    const linkStyle = "text-xl block border py-3 w-3/6 mx-auto mt-4 hover:text-grey"
    
    
    return hasPosted ? (
        <>
            <h1 className="text-3xl my-5">Details updated</h1>
            <Link to="/" className={linkStyle}>View all showings</Link>
            <Link to="/create-showing" className={linkStyle}>Create an event</Link>
        </>
    ) : (
        <>
            <h1 className="text-3xl sm:text-4xl my-5">Edit event details:</h1>
            <form
                className="flex flex-col px-2 mx-auto sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12"
                onSubmit={(e) =>
                    handleEventEditSubmit(
                        e,
                        firestore,
                        showing,
                        setError,
                        setIsPosting,
                        setHasPosted
                    )
                }
            >
                <div className={formElementStyle}>
                    <label className={labelStyle} htmlFor="event-name">
                        Name of Event:
                    </label>
                    <input
                        className={inputStyle}
                        id="event-name"
                        onChange={(e) => handleTextInput(e, setEventNameInput)}
                        value={eventNameInput}
                        type="text"
                    />
                </div>
                <div className={formElementStyle}>
                    <label className={labelStyle} htmlFor="film">
                        Film:
                    </label>
                    <input
                        className={inputStyle + " text-grey"}
                        id="film"
                        type="text"
                        value={film}
                        readOnly
                    />
                </div>
                <div className={formElementStyle}>
                    <label className={labelStyle} htmlFor="description">
                        Event Description:
                    </label>
                    <textarea
                        className={inputStyle + " min-h-20 sm:min-h-32 max-h-72"}
                        id="description"
                        onChange={(e) =>
                            handleTextInput(e, setDescriptionInput)
                        }
                        value={descriptionInput}
                        placeholder="Description of event"
                    />
                </div>
                <div className={formElementStyle}>
                    <label className={labelStyle} htmlFor="date">
                        Date:
                    </label>
                    <input
                        className={inputStyle}
                        id="date"
                        onChange={(e) => handleDateInput(e, setDateInput)}
                        value={dateInput}
                        type="date"
                        min={currentDate}
                        max={"2099-12-31"}
                    />
                </div>
                <div className={formElementStyle}>
                    <label className={labelStyle} htmlFor="time">
                        Start Time:
                    </label>
                    <input
                        className={inputStyle}
                        id="time"
                        type="time"
                        value={timeInput}
                        onChange={(e) => handleTimeInput(e, setTimeInput)}
                    />
                </div>
                <div className={formElementStyle}>
                    <label className={labelStyle} htmlFor="duration">
                        Event Duration:
                    </label>
                    <input
                        className={inputStyle}
                        id="duration"
                        type="time"
                        value={durationInput}
                        onChange={(e) => handleTimeInput(e, setDurationInput)}
                        min="00:30"
                    />
                </div>
                <div className={formElementStyle}>
                    <label className={labelStyle} htmlFor="price-type">
                        Price:
                    </label>
                    <select
                        className={inputStyle}
                        value={priceType}
                        id="price-type"
                        onChange={(e) => handlePriceTypeInput(e, setPriceType)}
                    >
                        <option value={"free"}>Free</option>
                        <option value={"optional"}>Pay what you like</option>
                        <option value={"set"}>Set price</option>
                    </select>
                </div>
                {priceType === "set" ? (
                    <div className={formElementStyle}>
                        <label className={labelStyle} htmlFor="price">
                            Ticket Price (£):
                        </label>
                        <input
                            className={inputStyle}
                            id="price"
                            value={priceInput}
                            type="text"
                            placeholder="0"
                            onChange={(e) =>
                                handlePriceInput(e, setPriceInput, setError)
                            }
                        />
                    </div>
                ) : null}
                {error ? (
                    <p className="text-xl w-11/12 bg-red mx-auto mb-2 rounded-lg py-1">
                        {error}
                    </p>
                ) : null}
                {isPosting ? (
                    <p className="text-2xl mb-2">Updating event...</p>
                ) : null}
                <button
                    type="submit"
                    className={buttonStyle}
                    disabled={isPosting}
                >
                    <p className={buttonTextStyle + " border"}>Update event</p>
                </button>
                <button
                    className={buttonStyle}
                    onClick={() => setIsEditing(false)}
                    disabled={isPosting}
                >
                    <p className={buttonTextStyle + " bg-red"}>Cancel changes</p>
                </button>
            </form>
        </>
    );
}

export default EventDetailsForm;
