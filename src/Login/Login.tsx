import "./Login.css"
import { useContext, useState } from "react";
import UserContext from "../../hooks/UserContext";
import SuccessfulLoginLinks from "./SuccessfulLoginLinks";
import SignUpForm from "./SignUpForm";
import GoogleLogin from "./GoogleLogin";

function Login() {
    const { user } = useContext(UserContext)
    const [isSigningUp, setIsSigningUp] = useState(false)

    return <>
        <h1>Events Platform</h1>
        {!user.email ? (
            isSigningUp ? (
                <SignUpForm />
            ) : (
                <>
                    <GoogleLogin/>
                    <button onClick={()=>setIsSigningUp(true)}>Sign up</button>
                </>
            )
        ) : (
            <SuccessfulLoginLinks user={user}/>
        )}
    </>
}

export default Login;
