import { useContext } from "react";
import UserContext from "../../hooks/UserContext";
import EmailFormElements from "./EmailFormElements";
import { handleEmailLogin } from "./event-handlers";
import { StringStateSetter } from "../../types";
import FirebaseContext from "../../hooks/FirebaseContext";

function EmailLogin({ setError, role }: { setError: StringStateSetter, role: string }) {
    const { setUser } = useContext(UserContext);
    const { firebase } = useContext(FirebaseContext)
    const databaseURL = import.meta.env.VITE_FIREBASE_REALTIME_URL

    return <>
        <form className="flex flex-col" onSubmit={e => handleEmailLogin(e, setUser, setError, role, firebase, databaseURL)}>
            <EmailFormElements />
            <button type="submit" className="mx-auto mt-5 hover:text-grey">
                <p className="text-base border p-2 w-max mx-auto md:text-lg md:px-3">Sign in</p>
            </button>
        </form>
    </>
}

export default EmailLogin;
