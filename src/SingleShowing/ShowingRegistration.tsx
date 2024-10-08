import { useState } from "react"
import { handleRegistration } from "./event-handlers"

function ShowingRegistration({id}: {id: string}) {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    return <>
        <p>Interested in attending?</p>
        <button onClick={() => handleRegistration(setIsButtonDisabled, id)} disabled={isButtonDisabled}>Register</button>
    </>
}

export default ShowingRegistration