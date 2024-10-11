import { useContext, useState } from "react";
import UserContext from "../../hooks/UserContext";
import EmailFormElements from "./EmailFormElements";
import { handleEmailLogin } from "./event-handlers";

function EmailLogin() {
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState("");

    return <>
        <form id="sign-up-form" onSubmit={(e) => handleEmailLogin(e, setUser, setError)}>
            <EmailFormElements />
        </form>
        <button onClick={() => console.log("sign in as staff")}>
            Sign in as Staff
        </button>
        <button onClick={() => console.log("sign in as non-staff")}>
            Sign in as Non-staff
        </button>
    </>
}

export default EmailLogin;
