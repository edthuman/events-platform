import { useContext } from "react";
import { Showing } from "../../server/firestore-types";
import { handleAddToCalendarClick } from "./event-handlers";
import UserContext from "../../hooks/UserContext";
import { BooleanStateSetter } from "../../types";

function RegisteredMessage({
    showing,
    isNotInCalendar,
    setIsNotInCalendar,
}: {
    showing: Showing;
    isNotInCalendar: boolean;
    setIsNotInCalendar: BooleanStateSetter;
}) {
    const {
        user: { token },
    } = useContext(UserContext);
    return (
        <>
            <p>You are registered for this event</p>
            {isNotInCalendar ? (
                <button
                    onClick={() =>
                        handleAddToCalendarClick(
                            showing,
                            token,
                            setIsNotInCalendar
                        )
                    }
                >
                    Add to Google Calendar
                </button>
            ) : null}
        </>
    );
}

export default RegisteredMessage;
