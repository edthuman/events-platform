import { useContext, useState } from "react";
import UserContext from "../../hooks/UserContext";
import { Showing } from "../../server/firestore-types";
import ShowingRegistration from "./ShowingRegistration";
import RegisteredMessage from "./RegisteredMessage";
import { BooleanStateSetter, StringStateSetter } from "../../types";
import UnregisteredMessage from "./UnregisteredMessage";
import ManageEventButton from "./ManageEvent";

function AttendShowing({
    showing,
    isNotInCalendar,
    setIsPaying,
    donation,
    setDonation,
    setIsEditing
}: {
    showing: Showing;
    isNotInCalendar: boolean;
    setIsPaying: BooleanStateSetter;
    donation: string;
    setDonation: StringStateSetter
    setIsEditing: BooleanStateSetter;
}) {
    const { user } = useContext(UserContext);
    const isUserInAttendees = showing.attendees.includes(user.email);
    const [isUserAttending, setIsUserAttending] = useState(isUserInAttendees);

    return user.role === "guest" ? (
        <UnregisteredMessage message="Please log in to register for event"/>
    ) : user.role === "staff" ? (
        <ManageEventButton setIsEditing={setIsEditing}/>
    ) : isUserAttending ? (
        <RegisteredMessage
            showing={showing}
            isNotInCalendar={isNotInCalendar}
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
