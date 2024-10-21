import { useContext } from "react"
import CreateShowingLink from "./CreateShowingLink"
import ViewShowingsLink from "./ViewShowingsLink"
import UserContext from "../../hooks/UserContext"
import { StringStateSetter } from "../../types"
import LogOutButton from "../LogOutButton"

function SuccessfulLoginLinks({ setError }: { setError: StringStateSetter }) {
    const { user } = useContext(UserContext)
    return <>
        <p>You are logged in</p>
        <div id="login-links">
            { user.role === "staff" ? <CreateShowingLink /> : null}
            <ViewShowingsLink />
            <LogOutButton setError={setError}/>
        </div>
    </>
}

export default SuccessfulLoginLinks