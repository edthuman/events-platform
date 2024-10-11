import { useContext } from "react"
import { handleLogin } from "./event-handlers"
import UserContext from "../../hooks/UserContext"

function GoogleLogin() {
    const { setUser } = useContext(UserContext)

    return <>
        <button onClick={() => handleLogin(setUser, "staff")}>
            Staff log in
        </button>
        <button onClick={() => handleLogin(setUser, "non-staff")}>
            Non-Staff log in
        </button>
    </>
}

export default GoogleLogin