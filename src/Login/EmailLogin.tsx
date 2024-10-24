import { useContext } from "react";
import UserContext from "../../hooks/UserContext";
import EmailFormElements from "./EmailFormElements";
import { handleEmailLogin } from "./event-handlers";
import { StringStateSetter } from "../../types";

function EmailLogin({ setError }: { setError: StringStateSetter }) {
    const { setUser } = useContext(UserContext);

    return <>
        <form className="flex flex-col" onSubmit={e => handleEmailLogin(e, setUser, setError)}>
            <EmailFormElements />
            <button type="submit" className="border w-20 mx-auto mt-5 hover:text-grey">
                Sign in
            </button>
        </form>
    </>
}

export default EmailLogin;
