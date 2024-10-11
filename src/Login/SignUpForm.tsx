import { useContext, useState } from "react";
import { handleSignUpClick } from "./event-handlers";
import "./SignUpForm.css";
import UserContext from "../../hooks/UserContext";
import EmailFormElements from "./EmailFormElements";

function SignUpForm() {
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState("");

    return <>
        {error ? <p>{error}</p> : null}
        <form
            id="sign-up-form"
            onSubmit={(e) => handleSignUpClick(e, setUser, setError)}
        >
            <EmailFormElements />
            <button type="submit">Sign Up</button>
        </form>
    </>
}

export default SignUpForm;
