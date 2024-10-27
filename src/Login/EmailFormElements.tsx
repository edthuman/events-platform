import { useState } from "react";
import { handleTextInput } from "../event-handlers";

function EmailFormElements() {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const labelStyling = "mt-5 mb-1";
    const inputStyling = "mx-auto w-11/12 pl-2 py-0.5 text-black";

    return (
        <>
            <label htmlFor="email" className={labelStyling}>
                Email:
            </label>
            <input
                id="email"
                className={inputStyling}
                type="email"
                value={emailInput}
                onChange={(e) => handleTextInput(e, setEmailInput)}
            />
            <label htmlFor="password" className={labelStyling}>
                Password:
            </label>
            <input
                id="password"
                className={inputStyling}
                type="password"
                value={passwordInput}
                onChange={(e) => handleTextInput(e, setPasswordInput)}
            />
        </>
    );
}

export default EmailFormElements;
