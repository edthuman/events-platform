import { useContext, useState } from "react"
import { handleRegistration } from "./event-handlers"
import UserContext from "../../hooks/UserContext"
import FirebaseContext from "../../hooks/FirebaseContext"
import { BooleanStateSetter } from "../../types"

function RegisterButton({setIsError, setIsRegistered, id} : {setIsError: BooleanStateSetter, setIsRegistered: BooleanStateSetter, id: string}) {
    const { user: { email } } = useContext(UserContext)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const firebase = useContext(FirebaseContext)

    return <>
        <p>Interested in attending?</p>
        <button 
            onClick={() => handleRegistration(setIsButtonDisabled, setIsError, setIsRegistered, firebase, email, id)} 
            disabled={isButtonDisabled}
        >
            Register
        </button>
    </>
}

export default RegisterButton