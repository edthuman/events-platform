import { Link, useLocation } from "react-router-dom"
import "./Header.css"

function Header() {
    const {pathname} = useLocation()

    return <>
        <h1>Community Cinema</h1>
        {pathname !== "/login" ? <Link to="/login" id="login-button">Login</Link> : null}
    </>
}

export default Header