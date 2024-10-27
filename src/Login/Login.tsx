import { useContext, useEffect, useState } from "react";
import UserContext from "../../hooks/UserContext";
import SuccessfulLoginLinks from "./SuccessfulLoginLinks";
import SignUpForm from "./SignUpForm";
import { handleGoogleLogin, handleRoleSelection } from "./event-handlers";
import EmailLogin from "./EmailLogin";
import { User } from "../../types";

function Login() {
    const { user, setUser } = useContext(UserContext)
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [isEmailLogin, setIsEmailLogin] = useState(false)
    const [error, setError] = useState("")
    const buttonStyle = "block mx-auto text-xl border mt-6 xl:mt-8 w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 hover:text-grey h-min"
    const buttonTextStyle = "text-xl sm:text-2xl py-3 sm:py-3 xl:py-4"

    useEffect(() => {
        if (!user.email) {
            setUser((currUser: User) => {
                return {
                    ...currUser,
                    role: "guest",
                }
            })
        }
    }, [])

    return <>
        {error ? <p className="text-xl mt-6 py-1 rounded-lg bg-red w-5/6 mx-auto">{error}</p> : null}
        {user.email ? (
            <SuccessfulLoginLinks setError={setError}/>
        ) :(
            user.role === "guest" ? (
            <>
                <h2 className="text-2xl xl:text-3xl no-underline pb-2 pt-8 mt-5">How are you logging in today?</h2>
                <button className={buttonStyle} onClick={() => handleRoleSelection(setUser, "staff")}>
                    <p className={buttonTextStyle}>Staff</p>
                </button>
                <button className={buttonStyle} onClick={() => handleRoleSelection(setUser, "non-staff")}>
                    <p className={buttonTextStyle}>Non-staff</p>
                </button>
            </>
        ) : (
            <>
                {isSigningUp ? (
                    <SignUpForm setError={setError}/>
                ) : (
                    isEmailLogin ? (
                        <EmailLogin setError={setError}/>
                    ) : (
                    <>
                        <button className={buttonStyle} onClick={() => setIsEmailLogin(true)}>
                            <p className={buttonTextStyle}>Sign in with Email</p>
                        </button>
                        <button className={buttonStyle} onClick={() => handleGoogleLogin(setUser, user.role, setError)}>
                            <p className={buttonTextStyle}>Sign in with Google</p>
                        </button>
                        <button className={buttonStyle} onClick={() => setIsSigningUp(true)}>
                            <p className={buttonTextStyle}>Sign up</p>
                        </button>
                    </> 
                ))}
            </>
            )
        )}
    </>
}

export default Login;
