import "./Login.css"

function Login() {
    return (
        <>
            <h1>Events Platform</h1>
            <p>How would you like to log in?</p>
            <div id="login-links">
                <a
                    href="/create-showing"
                    className="login-link"
                >
                    Staff
                </a>
                <a
                    href="/showings"
                    className="login-link"
                >
                    Non-Staff
                </a>
            </div>
        </>
    );
}

export default Login;
