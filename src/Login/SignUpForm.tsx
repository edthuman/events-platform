import { useContext, useState } from "react";
import { handleSignUpClick } from "./event-handlers";
import "./Form.css";
import UserContext from "../../hooks/UserContext";
import EmailFormElements from "./EmailFormElements";
import { StringStateSetter } from "../../types";

function SignUpForm({ setError }: { setError: StringStateSetter }) {
    const { setUser } = useContext(UserContext);

    return <>
        <form
            className="sign-up-form"
            onSubmit={(e) => handleSignUpClick(e, setUser, setError)}
        >
            <EmailFormElements />
            <button type="submit">Sign Up</button>
        </form>
    </>
}

export default SignUpForm;
