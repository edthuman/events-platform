import { useContext, useState } from "react"
import { handleRegistration } from "./event-handlers"
import FirebaseContext from "../../hooks/FirebaseContext"
import UserContext from "../../hooks/UserContext"

function ShowingRegistration({id}: {id: string}) {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const firebase = useContext(FirebaseContext)
    const {user: {username}} = useContext(UserContext)

    return <>
        <p>Interested in attending?</p>
        <button 
            onClick={() => handleRegistration(setIsButtonDisabled, firebase, username, id)} 
            disabled={isButtonDisabled}
        >
            Register
        </button>
    </>
}

export default ShowingRegistration