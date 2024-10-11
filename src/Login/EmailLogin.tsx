import { useContext, useState } from "react";
import UserContext from "../../hooks/UserContext";
import EmailFormElements from "./EmailFormElements";
import { handleEmailLogin } from "./event-handlers";

function EmailLogin() {
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState("");

    return <>
        {error ? <p>{error}</p> : null}
        <form id="sign-up-form" onSubmit={(e) => handleEmailLogin(e, setUser, setError)}>
            <EmailFormElements />
            <button type="submit">
                Sign in as Staff
            </button>
            <button type="submit">
                Sign in as Non-staff
            </button>
        </form>
    </>
}

export default EmailLogin;
