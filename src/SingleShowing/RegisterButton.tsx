import { useContext, useState } from "react"
import { handleBuyTicketClick } from "./event-handlers"
import UserContext from "../../hooks/UserContext"
import FirebaseContext from "../../hooks/FirebaseContext"
import { BooleanStateSetter } from "../../types"

function RegisterButton({setIsError, setIsUserAttending, id, setIsPaying, price} : {setIsError: BooleanStateSetter, setIsUserAttending: BooleanStateSetter, id: string, setIsPaying: BooleanStateSetter, price: "any" | number}) {
    const { user: { email } } = useContext(UserContext)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const firebase = useContext(FirebaseContext)

    return <>
        <p>Interested in attending?</p>
        <button onClick={() => handleBuyTicketClick(setIsPaying, setIsButtonDisabled, setIsError, setIsUserAttending, firebase, email, id, price)} disabled={isButtonDisabled}>
            Buy Ticket
        </button>
    </>
}

export default RegisterButton