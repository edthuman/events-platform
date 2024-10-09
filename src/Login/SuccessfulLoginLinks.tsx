import { User } from "../../types"
import CreateShowingLink from "./CreateShowingLink"
import ViewShowingsLink from "./ViewShowingsLink"

function SuccessfulLoginLinks({user}: {user: User}) {
    return <>
        <h1>Login Successful</h1>
        <div id="login-links">
            { user.role === "staff" ? <CreateShowingLink /> : null}
            <ViewShowingsLink />
        </div>
    </>
}

export default SuccessfulLoginLinks