import { useState } from "react"
import { Showing } from "../../server/firestore-types"
import { handleRegistration } from "./event-handlers"

function ShowingRegistration({showing}: {showing: Showing}) {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const { id } = showing

    return <>
        <p>Interested in attending?</p>
        <button onClick={() => handleRegistration(setIsButtonDisabled, id)} disabled={isButtonDisabled}>Register</button>
    </>
}

export default ShowingRegistration