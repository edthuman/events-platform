import "./Login.css"
import { useContext } from "react";
import UserContext from "../../hooks/UserContext";
import { handleLogin } from "./event-handlers";
import SuccessfulLoginLinks from "./SuccessfulLoginLinks";

function Login() {
    const {user, setUser} = useContext(UserContext)

    return <>
        <h1>Events Platform</h1>
        {!user.email ? (
            <>
                
                <button onClick={() => handleLogin(setUser, "staff")}>
                    Staff log in
                </button>
                <button onClick={() => handleLogin(setUser, "non-staff")}>
                    Non-Staff log in
                </button>
            </>
        ) : (
            <SuccessfulLoginLinks user={user}/>
        )}
    </>
}

export default Login;
