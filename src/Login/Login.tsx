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
    const buttonStyle = "text-xl border mt-6 w-10/12 hover:text-grey"

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
        {error ? <p className="text-xl mt-6 py-1 rounded-lg bg-[#a62d1f] w-5/6 mx-auto">{error}</p> : null}
        {user.email ? (
            <SuccessfulLoginLinks setError={setError}/>
        ) :(
            user.role === "guest" ? (
            <>
                <h2 className="text-2xl no-underline pb-2 pt-8">How are you logging in today?</h2>
                <button className={buttonStyle} onClick={() => handleRoleSelection(setUser, "staff")}>
                    Staff
                </button>
                <button className={buttonStyle} onClick={() => handleRoleSelection(setUser, "non-staff")}>
                    Non-staff
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
                        <button className={buttonStyle} onClick={() => setIsEmailLogin(true)}>Sign in with Email</button>
                        <button className={buttonStyle} onClick={() => handleGoogleLogin(setUser, user.role, setError)}>Sign in with Google</button>
                        <button className={buttonStyle} onClick={() => setIsSigningUp(true)}>Sign up</button>
                    </> 
                ))}
            </>
            )
        )}
    </>
}

export default Login;
