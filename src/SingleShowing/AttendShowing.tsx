import { useContext } from "react"
import UserContext from "../../hooks/UserContext"

function AttendShowing() {
    const { user } = useContext(UserContext)

    return user.role === "guest" ? (
        <p>Please log in to register for event</p>
    ) : (
        user.role === "staff" ? (
            <p>You must be non-staff to register for an event</p>
        ): (
            <p>You are non-staff</p>
        )
    )
}

export default AttendShowing