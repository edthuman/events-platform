import "./Login.css"
import { useContext, useState } from "react";
import UserContext from "../../hooks/UserContext";
import SuccessfulLoginLinks from "./SuccessfulLoginLinks";
import SignUpForm from "./SignUpForm";
import { handleGoogleLogin } from "./event-handlers";
import EmailLogin from "./EmailLogin";
import { User } from "../../types"

function Login() {
    const { user, setUser } = useContext(UserContext)
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [isEmailLogin, setIsEmailLogin] = useState(false)
    
    function updateUserRole(newRole: "non-staff" | "staff") {
        setUser((currUser: User) => {
            const newUser = {...currUser}
            newUser.role = newRole
            return newUser
        })
    }

    return user.email ? (
        <SuccessfulLoginLinks user={user}/>
    ) :(
        user.role === "guest" ? (
        <>
            <p>How are you logging in today?</p>
            <button onClick={() => updateUserRole("staff")}>Staff</button>
            <button onClick={() => updateUserRole("non-staff")}>Non-staff</button>
        </>
    ) : (
        isSigningUp ? (
            <SignUpForm />
        ) : (
            isEmailLogin ? (
                <EmailLogin />
            ) : (
        <>
            <button onClick={() => setIsEmailLogin(true)}>Sign in with Email</button>
            <button onClick={() => handleGoogleLogin(setUser, user.role)}>Sign in with Google</button>
            <button onClick={() => setIsSigningUp(true)}>Sign up</button>
        </> 
        )))
    )
}

export default Login;
