import { Link, useLocation } from "react-router-dom";
import UserContext from "../../hooks/UserContext";
import { useContext, useState } from "react";
import LogOutButton from "../LogOutButton";
import LogInButton from "./LogInButton";

function Header() {
    const { pathname } = useLocation();
    const { user } = useContext(UserContext);
    const isLoginPage = pathname === "/login"
    const isLoginLinkRequired = pathname !== "/login" && !user.email;
    const isLogOutButtonRequired = pathname !== "/login" && user.email;
    const [error, setError] = useState("");

    const homeLinkStyling = "text-3xl font-bold size-9/12 hover:text-grey pl-5"
    const titleTextStyling = "w-min"

    const loginHomeLinkStyling = "text-3xl font-bold size-full hover:text-grey"
    const loginTitleTextStyling = ""

    return (
        <>
            <div className="flex justify-between ">
                <Link to="/" className={isLoginPage ? loginHomeLinkStyling : homeLinkStyling}>
                    <p className={isLoginPage ? loginTitleTextStyling : titleTextStyling}>
                        Community<br/>Cinema
                    </p>
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
