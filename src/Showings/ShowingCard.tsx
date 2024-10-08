import "./ShowingCard.css"
import { getDate, getTime } from "../../utils/datetime-utils"
import { Showing } from "../../server/firestore-types"
import { Link } from "react-router-dom"

function ShowingCard({showing}: { showing: Showing }) {
    const {datetime} = showing
    const day = getDate(datetime)
    const time = getTime(datetime)

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