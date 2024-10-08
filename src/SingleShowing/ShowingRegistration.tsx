import { useState } from "react"
import RegisterButton from "./RegisterButton"

function ShowingRegistration({id}: {id: string}) {
    const [isError, setIsError] = useState(true)

    return <>
        <p>Interested in attending?</p>
        <RegisterButton setIsError={setIsError} id={id} />
        {isError ? <p>Error occurred during registration, please try again</p> : null}
    </>
}

export default ShowingRegistration