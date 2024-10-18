import { Showing } from "../../server/firestore-types";
import { Link } from "react-router-dom";
import { getEventLink } from "../../utils/google-calendar-utils"

function RegisteredMessage({
    showing,
    isNotInCalendar,
}: {
    showing: Showing;
    isNotInCalendar: boolean;
}) {
    const eventLink = getEventLink(showing)

    return (
        <>
            <p>You are registered for this event</p>
            {isNotInCalendar ? <Link to={eventLink} target="_blank">Add event to Google calendar</Link> : null}
        </>
    );
}

export default RegisteredMessage;
