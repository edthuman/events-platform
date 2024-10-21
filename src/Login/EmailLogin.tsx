import { useContext } from "react";
import UserContext from "../../hooks/UserContext";
import EmailFormElements from "./EmailFormElements";
import { handleEmailLogin } from "./event-handlers";
import "./Form.css"
import { StringStateSetter } from "../../types";

function EmailLogin({ setError }: { setError: StringStateSetter }) {
    const { setUser } = useContext(UserContext);

    return <>
        <form className="sign-up-form" onSubmit={e => handleEmailLogin(e, setUser, setError)}>
            <EmailFormElements />
            <button type="submit">
                Sign in
            </button>
        </form>
    </>
}

export default EmailLogin;
