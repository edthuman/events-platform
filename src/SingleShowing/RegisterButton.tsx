import { useContext, useState } from "react"
import { handleRegistration } from "./event-handlers"
import UserContext from "../../hooks/UserContext"
import FirebaseContext from "../../hooks/FirebaseContext"
import { BooleanStateSetter } from "../../types"

function RegisterButton({setIsError, setIsUserAttending, id} : {setIsError: BooleanStateSetter, setIsUserAttending: BooleanStateSetter, id: string}) {
    const { user: { email } } = useContext(UserContext)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const firebase = useContext(FirebaseContext)

    return <>
        <p>Interested in attending?</p>
        <button 
            onClick={() => handleRegistration(setIsButtonDisabled, setIsError, setIsUserAttending, firebase, email, id)} 
            disabled={isButtonDisabled}
        >
            Register
        </button>
    </>
}

export default RegisterButton