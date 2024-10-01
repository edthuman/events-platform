import "./ShowingCard.css"

function ShowingCard({showing}: {showing: any}) {
    const dateTime = showing["datetime"].toDate()
    const day = dateTime.toDateString().slice(4, 10)
    const time = dateTime.toTimeString().slice(0, 5)

    return <button className="showing-card" onClick={()=>console.log(`${showing.name}`)}>
        <p>{showing.name}</p>
        <p>{`${day}`}</p>
        <p>{`${time}`}</p>
        <img src={`${showing.poster}`} alt={`Movie post for ${showing.film}`} className="poster"/>
    </button>
}

export default ShowingCard