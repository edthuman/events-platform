import { useState } from "react"
import RegisterButton from "./RegisterButton"
import { BooleanStateSetter } from "../../types"

function ShowingRegistration({id, setIsUserAttending}: {id: string, setIsUserAttending: BooleanStateSetter}) {
    const [isError, setIsError] = useState(false)

    return <>
        <RegisterButton setIsError={setIsError} setIsUserAttending={setIsUserAttending} id={id} />
        {isError ? <p>Error occurred during registration, please try again</p> : null}
    </>
}

export default ShowingRegistration