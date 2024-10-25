import { Link } from "react-router-dom"
import { Showing } from "../../server/firestore-types"
import { FilmDetails } from "../../server/omdb-types"
import { getDate, getTime } from "../../utils/datetime-utils"
import AttendShowing from "./AttendShowing"
import { BooleanStateSetter, StringStateSetter } from "../../types"
import ToTopButton from "../ToTopButton"

function ShowingDetails({showing, filmDetails, isNotInCalendar, setIsPaying, donation, setDonation}: {showing: Showing, filmDetails: FilmDetails, isNotInCalendar: boolean, setIsPaying: BooleanStateSetter, donation: string, setDonation: StringStateSetter}) {
    let price = `£${Number(showing.price).toFixed(2)}`
    if (price === "£0.00") {
        price = "Free"
    }
    if (price === "£NaN") {
        price = "Donation"
    }
    
    return <>
        <Link to="/" className="block text-left hover:text-grey mt-2">{"←"}<span className="underline hover:no-underline">Back to all showings</span></Link>
        <h1 className="text-5xl mt-5 mb-5">{showing.name}</h1>
        <div className="grid grid-cols-2 grid-rows-2 px-8">
            <div className="row-span-2 text-left text-lg">
                <p className="pb-3">{getDate(showing.startDate)}</p>
                <p className="pb-1">{getTime(showing.startDate)}</p>
            </div>
            <div className="row-span-2 text-right text-lg">
                <p>{price}</p>
            </div>
        </div>
        <AttendShowing
                showing={showing}
                isNotInCalendar={isNotInCalendar}
                setIsPaying={setIsPaying}
                donation={donation}
                setDonation={setDonation}

        />
        <img src={`${showing.poster}`} alt={`Poster for ${filmDetails.title}`} className="m-auto size-7/12 mt-2 mb-4"/>
        <p className="text-2xl pb-10">{showing.description}</p>
        <div className="mb-5">
            <h2 className="text-3xl pb-3">Movie Details:</h2>
            <p className="text-2xl pb-3">
                {filmDetails.title} ({filmDetails.year})
            </p>
            <p className="text-2xl pb-3">Rated: {filmDetails.rating}</p>
            <p className="text-2xl pb-3">Runtime: {filmDetails.runtime}</p>
            <p className="text-2xl pb-3">Directed by: {filmDetails.director}</p>
            <p className="text-2xl pb-3">Genre(s): {filmDetails.genre}</p>
            <p className="text-2xl pb-4">Plot: {filmDetails.plot}</p>
            <Link
                to={`https://www.imdb.com/title/${showing.imdbId}`}
                target="_blank"
                className="text-xl underline text-off_white hover:text-grey hover:no-underline"
            >
                See full details on IMDb
            </Link>
        </div>
        <ToTopButton />
    </>
}

export default ShowingDetails