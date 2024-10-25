import { useState } from "react"
import RegisterButton from "./RegisterButton"
import { BooleanStateSetter, StringStateSetter } from "../../types"
import { Showing } from "../../server/firestore-types"

function ShowingRegistration({showing, setIsUserAttending, setIsPaying, donation, setDonation}: {showing: Showing, setIsUserAttending: BooleanStateSetter, setIsPaying: BooleanStateSetter, donation: string, setDonation: StringStateSetter}) {
    const [error, setError] = useState("")
    const { id, price } = showing
    
    return <>
        <RegisterButton setError={setError} setIsUserAttending={setIsUserAttending} id={id} setIsPaying={setIsPaying} price={price} donation={donation} setDonation={setDonation}/>
        {error ? <p className="text-xl px-2 mt-4 mb-4">{error}</p> : null}
    </>
}

export default ShowingRegistration