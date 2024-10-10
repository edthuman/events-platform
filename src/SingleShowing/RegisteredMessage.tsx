import { useContext, useState } from "react";
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
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const buttonText = isNotInCalendar ? "Add to Google calendar" : "Event is in your calendar"
    const isButtonDisabled = !isNotInCalendar || isLoading

    return (
        <>
            <p>You are registered for this event</p>
            <button
                onClick={() =>
                    handleAddToCalendarClick(
                        showing,
                        token,
                        setIsNotInCalendar,
                        setIsLoading,
                        setError
                    )
                }
                disabled={isButtonDisabled}
            >
                {buttonText}
            </button>
            {error ? (
                <p>{error}</p>
            ) : null}
        </>
    );
}

export default RegisteredMessage;
