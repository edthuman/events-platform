import { useContext, useState } from "react"
import { handleBuyTicketClick } from "./event-handlers"
import UserContext from "../../hooks/UserContext"
import FirebaseContext from "../../hooks/FirebaseContext"
import { BooleanStateSetter, StringStateSetter } from "../../types"
import DonationForm from "./DonationForm"

function RegisterButton({setError, setIsUserAttending, id, setIsPaying, price, donation, setDonation} : {setError: StringStateSetter, setIsUserAttending: BooleanStateSetter, id: string, setIsPaying: BooleanStateSetter, price: "any" | number, donation: string, setDonation: StringStateSetter}) {
    const { user: { email } } = useContext(UserContext)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const firebase = useContext(FirebaseContext)
    const isAnyPrice = price === "any"

    return <>
        <p>Interested in attending?</p>
        {isAnyPrice ? <DonationForm donation={donation} setDonation={setDonation}/> : null}
        <button onClick={() => handleBuyTicketClick(setIsPaying, setIsButtonDisabled, setError, setIsUserAttending, firebase, email, id, price, donation)} disabled={isButtonDisabled}>
            Buy Ticket
        </button>
    </>
}

export default RegisterButton