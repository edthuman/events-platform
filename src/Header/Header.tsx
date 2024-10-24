import { Link, useLocation } from "react-router-dom";
import UserContext from "../../hooks/UserContext";
import { useContext, useState } from "react";
import LogOutButton from "../LogOutButton";
import LogInButton from "./LogInButton";

function Header() {
    const { pathname } = useLocation();
    const { user } = useContext(UserContext);
    const isLoginLinkRequired = pathname !== "/login" && !user.email;
    const isLogOutButtonRequired = pathname !== "/login" && user.email;
    const [error, setError] = useState("");

    return (
        <>
            <div className="flex justify-between ">
                <Link to="/" className="text-3xl font-bold size-9/12 pl-5 hover:text-grey">
                    <p className="w-min">Community<br/>Cinema</p>
                </Link>
                {isLoginLinkRequired ? (
                    <LogInButton/>
                ) : null}
                {isLogOutButtonRequired ? (
                    <LogOutButton setError={setError} />
                ) : null}
            </div>
            {error ? <p>{error}</p> : null}
        </>
    );
}

export default Header;
