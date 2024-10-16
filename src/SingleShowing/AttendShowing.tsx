import { useContext, useState } from "react";
import UserContext from "../../hooks/UserContext";
import { Showing } from "../../server/firestore-types";
import ShowingRegistration from "./ShowingRegistration";
import RegisteredMessage from "./RegisteredMessage";
import { BooleanStateSetter, StringStateSetter } from "../../types";

function AttendShowing({
    showing,
    isNotInCalendar,
    setIsNotInCalendar,
    setIsPaying,
    donation,
    setDonation
}: {
    showing: Showing;
    isNotInCalendar: boolean;
    setIsNotInCalendar: BooleanStateSetter;
    setIsPaying: BooleanStateSetter;
    donation: string;
    setDonation: StringStateSetter;
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
            setIsUserAttending={setIsUserAttending}
            setIsPaying={setIsPaying}
            showing={showing}
            donation={donation}
            setDonation={setDonation}
        />
    );
}

export default AttendShowing;
