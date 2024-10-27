import { BooleanStateSetter } from "../../types"

function ManageEventButton({setIsEditing}: {setIsEditing: BooleanStateSetter}) {
    return <button className="text-xl border w-3/6 py-1 my-2 hover:text-grey" onClick={() => setIsEditing(true)}>Manage Event</button>
}

export default ManageEventButton