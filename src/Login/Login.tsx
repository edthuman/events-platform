import "./Login.css"
import { useContext, useState } from "react";
import UserContext from "../../hooks/UserContext";
import SuccessfulLoginLinks from "./SuccessfulLoginLinks";
import SignUpForm from "./SignUpForm";
import { handleGoogleLoginClick } from "./event-handlers";
import GoogleLogin from "./GoogleLogin";
import EmailLogin from "./EmailLogin";

function Login() {
    const { user } = useContext(UserContext)
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const [loginType, setLoginType] = useState("email")

    return <>
        <h1>Events Platform</h1>
        {!user.email ? (
            isSigningUp ? (
                <SignUpForm />
            ) : (
            isLoggingIn ? (
                loginType === "google" ? (
                    <GoogleLogin />
                ) : (
                    <EmailLogin />
                )
            ) : (
                <>
                    <button onClick={() => setIsSigningUp(true)}>Sign up</button>
                    <button onClick={() => handleGoogleLoginClick(setIsLoggingIn, setLoginType)}>Log in with Google account</button>
                    <button onClick={() => setIsLoggingIn(true)}>Log in with Email</button>
                </>
            ))
        ) : (
            <SuccessfulLoginLinks user={user}/>
        )}
    </>
}

export default Login;
