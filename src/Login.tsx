import { useContext } from "react"
import UserContext from "../hooks/UserContext"

function Login(){
    const {user, setUser} = useContext(UserContext)
    
    const staffUser = {
        role: "staff",
        username: "test"
    }

    const nonStaffUser = {
        role: "non-staff",
        username: "test"
    }

    const guestUser = {
        role: "guest",
        username: "guest"
    }

    return <>
        <h1>Events Platform</h1>
        <p>How would you like to log in?</p>
        <button onClick={()=>setUser(staffUser)}>Staff</button>
        <button onClick={()=>setUser(nonStaffUser)}>Non-Staff</button>
        <p>You are {user.role === "guest" ? "not" : null} logged in {user.role !== "guest" ? `as ${user.role}` : null}</p>
        {user.role !== "guest" ? <button onClick={()=>setUser(guestUser)}>Log out</button> : null}
        <a href="/showings">See current showings</a>
    </>
}

export default Login