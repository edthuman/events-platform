import { useState } from "react"
import { Showing } from "../../server/firestore-types"
import { handleAddToCalendarClick } from "./event-handlers"

function RegisteredMessage({showing, token}: {showing: Showing, token: string}) {
    const [isNotInCalendar, setIsNotInCalender] = useState(true)
    
    return <>
        <p>You are registered for this event</p>
        {isNotInCalendar ? (
            <button onClick={() => handleAddToCalendarClick(showing, token, setIsNotInCalender)}>
                Add to Google Calendar
            </button>
        ) : null}
    </>
}

export default RegisteredMessage