import { useContext } from "react"
import UserContext from "../../hooks/UserContext"
import { Showing } from "../../server/firestore-types";
import ShowingRegistration from "./ShowingRegistration";
import RegisteredMessage from "./RegisteredMessage";

function AttendShowing({showing}: {showing: Showing}) {
    const { user } = useContext(UserContext)
    const isUserAttending = showing.attendees.includes(user.username)

    return user.role === "guest" ? (
        <p>Please log in to register for event</p>
    ) : (
        user.role === "staff" ? (
            <p>You must be non-staff to register for an event</p>
        ): (
            isUserAttending ? (
                <RegisteredMessage />
            ) : (
                <ShowingRegistration id={showing.id}/>
        ))
    )
}

export default AttendShowing