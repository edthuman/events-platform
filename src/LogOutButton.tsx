import { useContext } from "react"
import { handleLogOutClick } from "./event-handler"
import UserContext from "../hooks/UserContext"
import { StringStateSetter } from "../types"

function LogOutButton({ setError }: { setError: StringStateSetter }) {
    const { setUser } = useContext(UserContext)
    return <button onClick={e => handleLogOutClick(e, setError, setUser)}>Log Out</button>
}

export default LogOutButton