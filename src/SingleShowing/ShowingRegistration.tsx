import { useState } from "react"
import RegisterButton from "./RegisterButton"
import { BooleanStateSetter } from "../../types"
import { Showing } from "../../server/firestore-types"

function ShowingRegistration({showing, setIsUserAttending, setIsPaying}: {showing: Showing, setIsUserAttending: BooleanStateSetter, setIsPaying: BooleanStateSetter}) {
    const [isError, setIsError] = useState(false)
    const { id, price } = showing
    return <>
        <RegisterButton setIsError={setIsError} setIsUserAttending={setIsUserAttending} id={id} setIsPaying={setIsPaying} price={price}/>
        {isError ? <p>Error occurred during registration, please try again</p> : null}
    </>
}

export default ShowingRegistration