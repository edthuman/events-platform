import { Firestore } from "@firebase/firestore"
import { addAttendee } from "../../server/firestore-methods"
import { BooleanStateSetter } from "../../types"
import { addToCalendar } from "../../server/firebase-auth-methods"
import { Showing } from "../../server/firestore-types"

export async function handleRegistration(setIsButtonDisabled: BooleanStateSetter, setIsError: BooleanStateSetter, setIsRegistered: BooleanStateSetter, firebase: Firestore, email: string, showingId: string){
    setIsButtonDisabled(true)
    setIsError(false)
    
    const response = await addAttendee(firebase, email, showingId)

    if (response.error) {
        setIsError(true)
        setIsButtonDisabled(false)
        return
    }

    setIsRegistered(true)
}

export function handleAddToCalendarClick(showing: Showing, token: string) {
    addToCalendar(showing, token)
}