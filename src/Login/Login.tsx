import "./Login.css"
import { useContext } from "react";
import UserContext from "../../hooks/UserContext";
import { handleLogin } from "./event-handlers";
import CreateShowingLink from "./CreateShowingLink";
import ViewShowingsLink from "./ViewShowingsLink";

function Login() {
    const {user, setUser} = useContext(UserContext)
    
    return !user.email ? (
        <>
            <h1>Events Platform</h1>
            <button onClick={() => handleLogin(setUser, "staff")}>
                Staff log in
            </button>
            <button onClick={() => handleLogin(setUser, "non-staff")}>
                Non-Staff log in
            </button>
        </>
    ) : (
        <>
            <h1>Login Successful</h1>
            <div id="login-links">
                        <CreateShowingLink />
                        <ViewShowingsLink />
            </div>
        </>
    )
}

export default Login;
