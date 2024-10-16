import { useContext, useState } from "react"
import { handleBuyTicketClick } from "./event-handlers"
import UserContext from "../../hooks/UserContext"
import FirebaseContext from "../../hooks/FirebaseContext"
import { BooleanStateSetter } from "../../types"
import DonationForm from "./DonationForm"

function RegisterButton({setIsError, setIsUserAttending, id, setIsPaying, price, donation, setDonation} : {setIsError: BooleanStateSetter, setIsUserAttending: BooleanStateSetter, id: string, setIsPaying: BooleanStateSetter, price: "any" | number, donation: string, setDonation: string}) {
    const { user: { email } } = useContext(UserContext)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const firebase = useContext(FirebaseContext)
    const isAnyPrice = price === "any"

    return <>
        <p>Interested in attending?</p>
        {isAnyPrice ? <DonationForm donation={donation} setDonation={setDonation}/> : null}
        <button onClick={() => handleBuyTicketClick(setIsPaying, setIsButtonDisabled, setIsError, setIsUserAttending, firebase, email, id, price, donation)} disabled={isButtonDisabled}>
            Buy Ticket
        </button>
    </>
}

export default RegisterButton