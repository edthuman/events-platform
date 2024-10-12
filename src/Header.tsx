import { Link, useLocation } from "react-router-dom"

function Header() {
    const {pathname} = useLocation()
    console.log(pathname)

    return <>
        <h1>Community Cinema</h1>
        {pathname !== "/login" ? <Link to="/login">Login</Link> : null}
    </>
}

export default Header