import { useContext, useState } from "react";
import UserContext from "../../hooks/UserContext";
import EmailFormElements from "./EmailFormElements";
import { handleEmailLogin } from "./event-handlers";
import "./Form.css"

function EmailLogin() {
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState("");

    return <>
        {error ? <p>{error}</p> : null}
        <form className="sign-up-form" onSubmit={e => handleEmailLogin(e, setUser, setError)}>
            <EmailFormElements />
            <button type="submit">
                Sign in
            </button>
        </form>
    </>
}

export default EmailLogin;
