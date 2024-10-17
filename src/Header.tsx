import { Link, useLocation } from "react-router-dom"
import "./Header.css"
import UserContext from "../hooks/UserContext"
import { useContext, useState } from "react"
import { handleLogOutClick } from "./event-handler"

function Header() {
    const { pathname } = useLocation()
    const { user } = useContext(UserContext)
    const isLoginLinkRequired = pathname !== "/login" && !user.email
    const isLogOutButtonRequired = pathname !== "/login" && user.email
    const [error, setError] = useState("")

    return <>
        <h1>Community Cinema</h1>
        {isLoginLinkRequired ? <Link to="/login" id="login-button">Login</Link> : null}
        {isLogOutButtonRequired? <button onClick={e => handleLogOutClick(e, setError)}>Log Out</button> : null}
        {error ? <p>{error}</p> : null}
    </>
}

export default Header