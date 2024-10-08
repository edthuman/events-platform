import { useState } from "react"
import RegisterButton from "./RegisterButton"
import RegisteredMessage from "./RegisteredMessage"

function ShowingRegistration({id}: {id: string}) {
    const [isError, setIsError] = useState(true)
    const [isRegistered, setIsRegistered] = useState(false)

    return <>
        <p>Interested in attending?</p>
        {isRegistered ? <RegisteredMessage /> : <RegisterButton setIsError={setIsError} id={id} />}
        {isError ? <p>Error occurred during registration, please try again</p> : null}
    </>
}

export default ShowingRegistration