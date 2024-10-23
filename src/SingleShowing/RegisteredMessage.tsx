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
            <p className="text-2xl pt-6 pb-3">You are registered for this event</p>
            {isNotInCalendar ? <Link to={eventLink} target="_blank" className="w-7/12 py-3 mb-5 bg-[#34393f] block m-auto hover:bg-[#59626d] rounded-lg shadow-lg">Add to Google calendar</Link> : null}
        </>
    );
}

export default RegisteredMessage;
