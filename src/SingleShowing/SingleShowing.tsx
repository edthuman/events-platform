import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FirebaseContext from "../../hooks/FirebaseContext";
import { getSingleShowing } from "../../server/firestore-methods";
import { getFilmDetails } from "../../server/omdb-methods";
import "./SingleShowing.css";
import { FilmDetailsResponse } from "../../server/omdb-types";
import ShowingDetails from "./ShowingDetails";
import Loading from "../Loading";
import AttendShowing from "./AttendShowing";
import { checkShowingInCalendar } from "../../server/google-methods";
import UserContext from "../../hooks/UserContext";
import ErrorMessage from "./ErrorMessage";

const omdbKey = import.meta.env.VITE_OMDB_KEY;

function SingleShowing() {
    // TypeScript error on ShowingDetails component can be ignored - filmDetails will be of type FilmDetails whenever this renders
    const showingId = useParams().showing_id;
    const [showing, setShowing] = useState<any>(null);
    const [filmDetails, setFilmDetails] = useState<FilmDetailsResponse>({
        error: "",
    });
    const firestore = useContext(FirebaseContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isNotInCalendar, setIsNotInCalendar] = useState(true);
    const [calendarError, setCalendarError] = useState("")
    const { user } = useContext(UserContext);
    const { token } = user

    useEffect(() => {
        (async () => {
            const showingDetails = await getSingleShowing(firestore, showingId);
            setShowing(showingDetails);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (showing && user.isGoogleAccount) {
                checkShowingInCalendar(
                    showing,
                    token,
                    setIsNotInCalendar,
                    setIsLoading,
                    setCalendarError
                );
            } else if (showing) {
                const filmDetails = await getFilmDetails(
                    omdbKey,
                    showing.imdbId
                );
                setFilmDetails(filmDetails);
                setIsLoading(false)
            }
        })();
    }, [showing]);
    console.log( showing, filmDetails, isLoading)
    return !showing || !filmDetails || isLoading ? (
        <Loading />
    ) : showing.error ? (
        <ErrorMessage error={showing.error} />
    ) : filmDetails.error ? (
        <ErrorMessage error={filmDetails.error} />
    ) : calendarError ? (
        <ErrorMessage error={calendarError} />
    ) : (
        <>
            <AttendShowing
                showing={showing}
                isNotInCalendar={isNotInCalendar}
                setIsNotInCalendar={setIsNotInCalendar}
            />
            <ShowingDetails showing={showing} filmDetails={filmDetails} />
        </>
    );
}

export default SingleShowing;
