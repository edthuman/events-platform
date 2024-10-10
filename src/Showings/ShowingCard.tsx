import "./ShowingCard.css"
import { getDate, getTime } from "../../utils/datetime-utils"
import { Showing } from "../../server/firestore-types"
import { Link } from "react-router-dom"

function ShowingCard({showing}: { showing: Showing }) {
    const {startDate} = showing
    const day = getDate(startDate)
    const time = getTime(startDate)

    return <Link to={`/showing/${showing.id}`} target="_self">
        <div className="showing-card" >
            <p>{showing.name}</p>
            <p>{day}</p>
            <p>{time}</p>
            <img src={`${showing.poster}`} alt={`Movie post for ${showing.film}`} className="poster"/>
        </div>
    </Link>
}

export default ShowingCard