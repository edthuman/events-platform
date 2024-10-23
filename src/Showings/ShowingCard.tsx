import { getDate } from "../../utils/datetime-utils"
import { Showing } from "../../server/firestore-types"
import { Link } from "react-router-dom"

function ShowingCard({showing}: { showing: Showing }) {
    const {startDate} = showing
    const day = getDate(startDate)

    return <Link to={`/showing/${showing.id}`} target="_self">
        <div className="mb-10 flex flex-col items-center py-4 bg-[#195477] hover:bg-[#10374e]">
            <img src={`${showing.poster}`} alt={`Movie poster for ${showing.film}`} className="size-10/12"/>
            <p>{showing.name}</p>
            <p>{day}</p>
        </div>
    </Link>
}

export default ShowingCard