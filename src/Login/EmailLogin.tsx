import { useContext, useState } from "react";
import UserContext from "../../hooks/UserContext";
import EmailFormElements from "./EmailFormElements";
import { handleEmailLogin, handleRoleInputChange } from "./event-handlers";
import "./Form.css"

function EmailLogin() {
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState("");
    const [roleInput, setRoleInput] = useState("staff")

    return <>
        {error ? <p>{error}</p> : null}
        <form className="sign-up-form" onSubmit={e => handleEmailLogin(e, setUser, setError)}>
            <label htmlFor="staff" >Staff</label>
            <input type="radio" id="staff" name="role" value="staff" checked={roleInput === "staff"} onChange={e => handleRoleInputChange(e, setRoleInput)}/>
            <label htmlFor="non-staff">Non-Staff</label>
            <input type="radio" id="non-staff" name="role" value="non-staff" checked={roleInput === "non-staff"} onChange={e => handleRoleInputChange(e, setRoleInput)}/>
            <EmailFormElements />
            <button type="submit">
                Sign in
            </button>
        </form>
    </>
}

export default EmailLogin;
