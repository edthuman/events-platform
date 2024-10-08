import { useContext, useState } from "react"
import { handleRegistration } from "./event-handlers"
import FirebaseContext from "../../hooks/FirebaseContext"
import UserContext from "../../hooks/UserContext"

function ShowingRegistration({id}: {id: string}) {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const firebase = useContext(FirebaseContext)
    const {user: {username}} = useContext(UserContext)
    const [isError, setIsError] = useState(false) 

    return <>
        <p>Interested in attending?</p>
        <button 
            onClick={() => handleRegistration(setIsButtonDisabled, setIsError, firebase, username, id)} 
            disabled={isButtonDisabled}
        >
            Register
        </button>
        {isError ? <p>Error occurred during registration, please try again</p> : null}
    </>
}

export default ShowingRegistration