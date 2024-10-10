import { User } from "../../types"
import CreateShowingLink from "./CreateShowingLink"
import ViewShowingsLink from "./ViewShowingsLink"

function SuccessfulLoginLinks({user}: {user: User}) {
    return <>
        <p>Login Successful</p>
        <div id="login-links">
            { user.role === "staff" ? <CreateShowingLink /> : null}
            <ViewShowingsLink />
        </div>
    </>
}

export default SuccessfulLoginLinks