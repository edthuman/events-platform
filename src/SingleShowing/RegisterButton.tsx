import { useContext, useState } from "react"
import { handleRegistration } from "./event-handlers"
import UserContext from "../../hooks/UserContext"
import FirebaseContext from "../../hooks/FirebaseContext"
import { BooleanStateSetter } from "../../types"

function RegisterButton({setIsError, id} : {setIsError: BooleanStateSetter, id: string}) {
    const {user: {username}} = useContext(UserContext)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const firebase = useContext(FirebaseContext)

    return <button 
        onClick={() => handleRegistration(setIsButtonDisabled, setIsError, firebase, username, id)} 
        disabled={isButtonDisabled}
    >
        Register
    </button>
}

export default RegisterButton