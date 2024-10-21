import { useContext } from "react"
import { handleLogOutClick } from "../event-handler"
import CreateShowingLink from "./CreateShowingLink"
import ViewShowingsLink from "./ViewShowingsLink"
import UserContext from "../../hooks/UserContext"

function SuccessfulLoginLinks() {
    const { user, setUser } = useContext(UserContext)
    return <>
        <p>You are logged in</p>
        <div id="login-links">
            { user.role === "staff" ? <CreateShowingLink /> : null}
            <ViewShowingsLink />
            <button onClick={e => handleLogOutClick(e, setError, setUser)}>Log Out</button>
        </div>
    </>
}

export default SuccessfulLoginLinks