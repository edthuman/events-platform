import { Showing } from "../../server/firestore-types"
import { handleAddToCalendarClick } from "./event-handlers"

function RegisteredMessage({showing, token}: {showing: Showing, token: string}) {
    return <>
        <p>You are registered for this event</p>
        <button onClick={() => handleAddToCalendarClick(showing, token)}>Add to Google Calendar</button>
    </>
}

export default RegisteredMessage