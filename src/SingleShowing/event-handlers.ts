import { Firestore } from "@firebase/firestore"
import { addAttendee } from "../../server/firestore-methods"
import { BooleanStateSetter } from "../../types"

export async function handleRegistration(setIsButtonDisabled: BooleanStateSetter, setIsError: BooleanStateSetter, firebase: Firestore, username: string, showingId: string){
    setIsButtonDisabled(true)
    setIsError(false)
    
    const response = await addAttendee(firebase, username, showingId)

    if (response.error) {
        setIsError(true)
        setIsButtonDisabled(false)
        return
    }

    setIsButtonDisabled(false)
}