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
        {isAnyPrice ? <DonationForm donation={donation} setDonation={setDonation}/> : null}
        <button className="attend_button mt-4" onClick={() => handleBuyTicketClick(setIsPaying, setIsButtonDisabled, setError, setIsUserAttending, firebase, email, id, price, donation)} disabled={isButtonDisabled}>
            {price === 0 ? "Get": "Buy"} Ticket
        </button>
    </>
}

export default RegisterButton