import { useContext } from "react";
import UserContext from "../../hooks/UserContext";
import "./Login.css"

function Login() {
    const { setUser } = useContext(UserContext);

    const staffUser = {
        role: "staff",
        username: "test",
    };

    const nonStaffUser = {
        role: "non-staff",
        username: "test",
    };

    return (
        <>
            <h1>Events Platform</h1>
            <p>How would you like to log in?</p>
            <div id="login-links">
                <a
                    href="/create-showing"
                    onClick={() => setUser(staffUser)}
                    className="login-link"
                >
                    Staff
                </a>
                <a
                    href="/showings"
                    onClick={() => setUser(nonStaffUser)}
                    className="login-link"
                >
                    Non-Staff
                </a>
            </div>
        </>
    );
}

export default Login;