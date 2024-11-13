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

    const homeLinkStyling = "font-bold hover:text-grey pl-5"
    const titleTextStyling = "w-min text-3xl lg:text-4xl"

    const loginPageHomeLinkStyling = "w-full flex justify-center text-3xl font-bold hover:text-grey"
    const loginPageTitleTextStyling = "text-4xl md:text-4xl xl:text-5xl"

    return (
        <>
            <div className="mt-2 flex justify-between">
                <div className={isLoginPage ? loginPageHomeLinkStyling : homeLinkStyling}>
                    <Link to="/" className={isLoginPage ? "my-4" : ""} >
                        <p className={isLoginPage ? loginPageTitleTextStyling : titleTextStyling}>
                            Community<br/>Cinema
                        </p>
                    </Link>
                </div>
                {isLoginLinkRequired ? (
                    <LogInButton/>
                ) : null}
                {isLogOutButtonRequired ? (
                    <LogOutButton setError={setError} />
                ) : null}
            </div>
            {error ? <p className="mt-1 text-base bg-red w-max px-2 py-1 mx-auto  rounded-md">{error}</p> : null}
        </>
    );
}

export default Header;
