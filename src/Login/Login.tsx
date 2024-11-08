import { useContext, useEffect, useState } from "react";
import UserContext from "../../hooks/UserContext";
import SuccessfulLoginLinks from "./SuccessfulLoginLinks";
import SignUpForm from "./SignUpForm";
import { handleGoogleLogin, handleRoleSelection } from "./event-handlers";
import EmailLogin from "./EmailLogin";
import { User } from "../../types";
import HomeLink from "../SingleShowing/HomeLink";

function Login() {
    const { user, setUser } = useContext(UserContext)
    const {email, role} = user
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [isEmailLogin, setIsEmailLogin] = useState(false)
    const [error, setError] = useState("")
    const buttonStyle = "block mx-auto text-xl border mt-6 xl:mt-8 w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 hover:text-grey h-min"
    const buttonTextStyle = "text-xl sm:text-2xl py-3 sm:py-3 xl:py-4"

    useEffect(() => {
        if (!email) {
            setUser((currUser: User) => {
                return {
                    ...currUser,
                    role: "guest",
                }
            })
        }
    }, [])

    return <>
    <HomeLink/>
        {error ? <p className="text-lg lg:text-xl mt-6 py-1 lg:py-2 px-4 rounded-lg bg-red w-10/12 sm:w-7/12 md:w-6/12 lg:5/12 xl:4/12 mx-auto">{error}</p> : null}
        {email ? (
            <SuccessfulLoginLinks setError={setError}/>
        ) :(
            role === "guest" ? (
            <>
                <h2 className="text-2xl xl:text-3xl no-underline pb-2 mt-7">How are you signing in today?</h2>
                <button className={buttonStyle} onClick={() => handleRoleSelection(setUser, "staff")}>
                    <p className={buttonTextStyle}>Staff</p>
                </button>
                <button className={buttonStyle} onClick={() => handleRoleSelection(setUser, "non-staff")}>
                    <p className={buttonTextStyle}>Non-staff</p>
                </button>
            </>
        ) : (
            role === "staff" || isEmailLogin ? (
            <EmailLogin setError={setError} role={role}/>
        ) : (
            <>
                {isSigningUp ? (
                    <SignUpForm setError={setError}/>
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
                )}
            </>
            ))
        )}
    </>
}

export default Login;
