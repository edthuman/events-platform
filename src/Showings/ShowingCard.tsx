import { Showing } from "../../types"
import "./ShowingCard.css"
import { getDate, getTime } from "../../utils/datetime-utils"

function ShowingCard({showing}: {showing: Showing}) {
    const {datetime} = showing
    const day = getDate(datetime)
    const time = getTime(datetime)

    return <a href={`/showing/${showing.id}`} target="_self">
        <div className="showing-card" >
            <p>{showing.name}</p>
            <p>{day}</p>
            <p>{time}</p>
            <img src={`${showing.poster}`} alt={`Movie post for ${showing.film}`} className="poster"/>
        </div>
    </a>
}

export default ShowingCard