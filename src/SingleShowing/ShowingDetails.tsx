import { Link } from "react-router-dom"
import { Showing } from "../../server/firestore-types"
import { getDate, getTime } from "../../utils/datetime-utils"
import AttendShowing from "./AttendShowing"
import { BooleanStateSetter, StringStateSetter } from "../../types"
import ToTopButton from "../ToTopButton"
import HomeLink from "./HomeLink"

function ShowingDetails({showing, filmDetails, isNotInCalendar, setIsPaying, donation, setDonation, setIsEditing}: {showing: Showing, filmDetails: any, isNotInCalendar: boolean, setIsPaying: BooleanStateSetter, donation: string, setDonation: StringStateSetter, setIsEditing: BooleanStateSetter}) {
    const { title, year, rating, runtime, director, genre, plot } = filmDetails
    const { name, startDate, poster, description, imdbId } = showing
    let price = `£${Number(showing.price).toFixed(2)}`
    if (price === "£0.00") {
        price = "Free"
    }
    if (price === "£NaN") {
        price = "Donation"
    }
    
    return <>
        <HomeLink />
        <h1 className="text-5xl mt-5 mb-5">{name}</h1>
        <div className="grid grid-cols-2 grid-rows-2 px-8">
            <div className="row-span-2 text-left text-lg">
                <p className="pb-3">{getDate(startDate)}</p>
                <p className="pb-1">{getTime(startDate)}</p>
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
                setIsEditing={setIsEditing}

        />
        <img src={`${poster}`} alt={`Poster for ${title}`} className="m-auto size-7/12 mt-2 mb-4"/>
        <p className="text-2xl pb-10">{description}</p>
        <div className="mb-5">
            <h2 className="text-3xl pb-3">Movie Details:</h2>
            <p className="text-2xl pb-3">
                {title} ({year})
            </p>
            <p className="text-2xl pb-3">Rated: {rating}</p>
            <p className="text-2xl pb-3">Runtime: {runtime}</p>
            <p className="text-2xl pb-3">Directed by: {director}</p>
            <p className="text-2xl pb-3">Genre(s): {genre}</p>
            <p className="text-2xl pb-4">Plot: {plot}</p>
            <Link
                to={`https://www.imdb.com/title/${imdbId}`}
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