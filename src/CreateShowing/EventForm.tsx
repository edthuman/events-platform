import { useContext, useState } from "react";
import {
    handleDateInput,
    handlePriceTypeInput,
    handleTimeInput,
} from "../event-handlers";
import { getCurrentDate } from "../../utils/datetime-utils";
import FirebaseContext from "../../hooks/FirebaseContext";
import { BooleanStateSetter, StringStateSetter } from "../../types";
import { handlePriceInput, handleTextInput } from "../event-handlers";
import { handleEventFormSubmit } from "./event-handlers";
import { getFirestore } from "@firebase/firestore";

function EventForm({
    filmDetails,
    setShowingId,
    setIsPosting,
}: {
    filmDetails: any;
    setShowingId: StringStateSetter;
    setIsPosting: BooleanStateSetter;
}) {
    const currentDate = getCurrentDate();
    const [eventNameInput, setEventNameInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [dateInput, setDateInput] = useState(currentDate);
    const [timeInput, setTimeInput] = useState("00:00");
    const [durationInput, setDurationInput] = useState("00:30");
    const [priceType, setPriceType] = useState("free");
    const [priceInput, setPriceInput] = useState("");
    const { title, imdbId, poster } = filmDetails;
    const firebaseApp = useContext(FirebaseContext);
    const firestore = getFirestore(firebaseApp)
    const [error, setError] = useState("");
    const formElementStyle = "flex mb-4 self-center w-full";
    const labelStyle = "flex text-lg md:text-xl w-1/2 self-center justify-center";
    const inputStyle = "bg-off_white md:text-lg text-black w-1/2 px-2 py-1 text-center";

    return (
        <>
            <h1 className="text-3xl my-5">Fill out events details:</h1>
            <form
                className="flex flex-col px-2 mx-auto sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12"
                onSubmit={(e) =>
                    handleEventFormSubmit(
                        e,
                        title,
                        imdbId,
                        poster,
                        firestore,
                        setError,
                        setShowingId,
                        setIsPosting
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
                        placeholder="My Event"
                    />
                </div>
                <div className={formElementStyle}>
                    <label className={labelStyle} htmlFor="film-name">
                        Film:
                    </label>
                    <input
                        className={inputStyle + " text-grey"}
                        id="film-name"
                        value={title}
                        type="text"
                        readOnly
                    />
                </div>
                <div className={formElementStyle}>
                    <label className={labelStyle} htmlFor="description">
                        Event Description:
                    </label>
                    <textarea
                        className={inputStyle + " min-h-20 xl:min-h-32 max-h-72"}
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
                    <p className="text-xl w-11/12 lg:w-10/12 bg-red mx-auto mb-2 rounded-lg py-1">
                        {error}
                    </p>
                ) : null}
                <button type="submit" className="mt-2">
                    <p className="border hover:text-grey mx-auto w-max text-lg md:text-xl px-3 md:px-4 py-2 md:py-3">Create event</p>
                </button>
            </form>
        </>
    );
}

export default EventForm;
