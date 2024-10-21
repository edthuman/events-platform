import { Link, useLocation } from "react-router-dom"
import "./Header.css"
import UserContext from "../hooks/UserContext"
import { useContext, useState } from "react"
import LogOutButton from "./LogOutButton"

function Header() {
    const { pathname } = useLocation()
    const { user } = useContext(UserContext)
    const isLoginLinkRequired = pathname !== "/login" && !user.email
    const isLogOutButtonRequired = pathname !== "/login" && user.email
    const [error, setError] = useState("")

    return <>
        <h1>Community Cinema</h1>
        {isLoginLinkRequired ? <Link to="/login" id="login-button">Login</Link> : null}
        {isLogOutButtonRequired? <LogOutButton setError={setError}/> : null}
        {error ? <p>{error}</p> : null}
    </>
}

export default Header