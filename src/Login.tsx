import { useContext } from "react"
import { SetUser } from "../types"
import UserContext from "../hooks/UserContext"

function Login({setUser}: {setUser: SetUser}){
    const user = useContext(UserContext)
    
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
    </>
}

export default Login

