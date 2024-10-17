import { Link, useLocation } from "react-router-dom"
import "./Header.css"
import UserContext from "../hooks/UserContext"
import { useContext } from "react"

function Header() {
    const { pathname } = useLocation()
    const { user } = useContext(UserContext)
    const isLoginLinkRequired = pathname !== "/login" && !user.email

    return <>
        <h1>Community Cinema</h1>
        {isLoginLinkRequired ? <Link to="/login" id="login-button">Login</Link> : null}
    </>
}

export default Header