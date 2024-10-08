import { Firestore } from "@firebase/firestore"
import { addAttendee } from "../../server/firestore-methods"
import { BooleanStateSetter } from "../../types"

export async function handleRegistration(setIsButtonDisabled: BooleanStateSetter, firebase: Firestore, username: string, showingId: string){
    setIsButtonDisabled(true)
    
    const response = await addAttendee(firebase, username, showingId)

    if (response.error) {
        setIsButtonDisabled(false)
        return
    }

    setIsButtonDisabled(false)
}