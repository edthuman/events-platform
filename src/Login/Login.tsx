import { Link } from "react-router-dom";
import "./Login.css"

function Login() {
    return (
        <>
            <h1>Events Platform</h1>
            <p>How would you like to log in?</p>
            <div id="login-links">
                <Link
                    to="/create-showing"
                    className="login-link"
                >
                    Staff
                </Link>
                <Link
                    to="/showings"
                    className="login-link"
                >
                    Non-Staff
                </Link>
            </div>
        </>
    );
}

export default Login;
