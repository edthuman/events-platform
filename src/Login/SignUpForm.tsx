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
            <button type="submit" className="border w-20 mx-auto mt-5 hover:text-grey">
                Sign Up
            </button>
        </form>
    </>
}

export default SignUpForm;
