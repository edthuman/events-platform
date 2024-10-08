import { BooleanStateSetter } from "../../types"

export function handleRegistration(setIsButtonDisabled: BooleanStateSetter, id: string){
    setIsButtonDisabled(true)
    
    // add user to attendees 

    setIsButtonDisabled(false)
}