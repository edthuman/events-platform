import { useContext, useState } from "react";
import UserContext from "../../hooks/UserContext";
import { Showing } from "../../server/firestore-types";
import ShowingRegistration from "./ShowingRegistration";
import RegisteredMessage from "./RegisteredMessage";
import { BooleanStateSetter } from "../../types";

function AttendShowing({
    showing,
    isNotInCalendar,
    setIsNotInCalendar,
}: {
    showing: Showing;
    isNotInCalendar: boolean;
    setIsNotInCalendar: BooleanStateSetter;
}) {
    const { user } = useContext(UserContext);
    const isUserInAttendees = showing.attendees.includes(user.email);
    const [isUserAttending, setIsUserAttending] = useState(isUserInAttendees);

    return user.role === "guest" ? (
        <p>Please log in to register for event</p>
    ) : user.role === "staff" ? (
        <p>You must be non-staff to register for an event</p>
    ) : isUserAttending ? (
        <RegisteredMessage
            showing={showing}
            isNotInCalendar={isNotInCalendar}
            setIsNotInCalendar={setIsNotInCalendar}
        />
    ) : (
        <ShowingRegistration
            id={showing.id}
            setIsUserAttending={setIsUserAttending}
        />
    );
}

export default AttendShowing;
