import { useContext } from "react"
import { handleGoogleLogin } from "./event-handlers"
import UserContext from "../../hooks/UserContext"

function GoogleLogin() {
    const { setUser } = useContext(UserContext)

    return <>
        <button onClick={() => handleGoogleLogin(setUser, "staff")}>
            Staff log in
        </button>
        <button onClick={() => handleGoogleLogin(setUser, "non-staff")}>
            Non-Staff log in
        </button>
    </>
}

export default GoogleLogin