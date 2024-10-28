import { useContext } from "react";
import { handleLogOutClick } from "./event-handlers";
import UserContext from "../hooks/UserContext";
import { StringStateSetter } from "../types";

function LogOutButton({ setError }: { setError: StringStateSetter }) {
    const { setUser } = useContext(UserContext);
    return (
        <button
            className="flex items-start justify-center w-3/12 mt-1 mr-2"
            onClick={(e) => handleLogOutClick(e, setError, setUser)}
        >
            <p className="text-xl font-medium text-black bg-[#D45143] hover:bg-[#AF4C40] p-2 rounded-xl md:text-2xl lg:p-3">
                Log Out
            </p>
        </button>
    );
}

export default LogOutButton;
