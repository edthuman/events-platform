import { Showing } from "../../types"
import "./ShowingCard.css"

function ShowingCard({showing}: {showing: Showing}) {
    const dateTime = showing["datetime"].toDate()
    const day = dateTime.toDateString().slice(4, 10)
    const time = dateTime.toTimeString().slice(0, 5)

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