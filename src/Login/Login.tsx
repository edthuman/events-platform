import { Link } from "react-router-dom";
import "./Login.css"
import { useContext } from "react";
import UserContext from "../../hooks/UserContext";
import { handleLogin } from "./event-handlers";

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
    ) : <>
    <h1>Login Successful</h1>
    <div id="login-links">
                <Link
                    to="/create-showing"
                    className="login-link"
                >
                    Create Showing
                </Link>
                <Link
                    to="/showings"
                    className="login-link"
                >
                    View Showings
                </Link>
            </div>
    </>
}

export default Login;
