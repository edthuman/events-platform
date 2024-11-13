import { useContext } from "react";
import { handleSignUpClick } from "./event-handlers";
import UserContext from "../../hooks/UserContext";
import EmailFormElements from "./EmailFormElements";
import { StringStateSetter } from "../../types";

function SignUpForm({ setError }: { setError: StringStateSetter }) {
    const { setUser } = useContext(UserContext);

    return <>
        <form
            onSubmit={(e) => handleSignUpClick(e, setUser, setError)}
            className="flex flex-col"
        >
            <EmailFormElements />
            <button type="submit" className="w-max h-max mx-auto mt-5 hover:text-grey">
                <p className="text-base border p-2 w-max mx-auto md:text-lg md:px-3">Sign Up</p>
            </button>
        </form>
    </>
}

export default SignUpForm;
