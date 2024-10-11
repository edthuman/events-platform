import "./Login.css"
import { useContext, useState } from "react";
import UserContext from "../../hooks/UserContext";
import { handleLogin, handleSignUpClick } from "./event-handlers";
import SuccessfulLoginLinks from "./SuccessfulLoginLinks";
import SignUpForm from "./SignUpForm";

function Login() {
    const {user, setUser} = useContext(UserContext)
    const [isSigningUp, setIsSigningUp] = useState(false)

    return <>
        <h1>Events Platform</h1>
        {!user.email ? (
            isSigningUp ? (
                <SignUpForm />
            ) : (
                <>   
                    <button onClick={() => handleLogin(setUser, "staff")}>
                        Staff log in
                    </button>
                    <button onClick={() => handleLogin(setUser, "non-staff")}>
                        Non-Staff log in
                    </button>
                    <button onClick={()=>setIsSigningUp(true)}>Sign up</button>
                </>
            )
        ) : (
            <SuccessfulLoginLinks user={user}/>
        )}
    </>
}

export default Login;
