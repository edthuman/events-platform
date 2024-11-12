import { getDate } from "../../utils/datetime-utils"
import { Showing } from "../../server/firestore-types"
import { Link } from "react-router-dom"

function ShowingCard({showing}: { showing: Showing }) {
    const {startDate} = showing
    const day = getDate(startDate)

    return <Link to={`/showing/${showing.id}`} target="_self">
        <div className="mb-1 flex flex-col items-center py-4 bg-[#23658e] drop-shadow-xl hover:bg-[#66889c] rounded-lg">
            <div className="flex justify-center px-5">
                <img src={`${showing.poster}`} alt={`Movie poster for ${showing.film}`} className="w-10/12 w-[15.5rem] py-auto"/>
            </div>
            <p className="text-2.5xl px-4 pt-2 w-72 overflow-hidden text-nowrap text-ellipsis">{showing.name}</p>
            <p className="text-2.5xl">{day}</p>
        </div>
    </Link>
}

export default ShowingCard