import { useContext } from "react"
import CreateShowingLink from "./CreateShowingLink"
import ViewShowingsLink from "./ViewShowingsLink"
import UserContext from "../../hooks/UserContext"
import { StringStateSetter } from "../../types"
import LogOutButton from "../LogOutButton"

function SuccessfulLoginLinks({ setError }: { setError: StringStateSetter }) {
    const { user } = useContext(UserContext)
    const linkStyling = "text-xl py-3 px-3 hover:text-grey border w-4/6"

    return <>
        <h2 className="text-3xl py-5 mb-2 no-underline">You are logged in</h2>
        <div className="flex flex-col items-center gap-6">
            { user.role === "staff" ? <CreateShowingLink linkStyling={linkStyling}/> : null}
            <ViewShowingsLink linkStyling={linkStyling}/>
            <LogOutButton setError={setError}/>
        </div>
    </>
}

export default SuccessfulLoginLinks