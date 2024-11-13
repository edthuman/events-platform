import { useContext, useState } from "react";
import FilmSearch from "./FilmSearch/FilmSearch";
import EventForm from "./EventForm";
import { FilmPreviewResponse } from "../../server/omdb-types";
import PostSuccessMessage from "./PostSuccessMessage";
import Loading from "../Loading";
import UserContext from "../../hooks/UserContext";
import HomeLink from "../SingleShowing/HomeLink";

function CreateShowing() {
    const [filmDetails, setFilmDetails] = useState<FilmPreviewResponse>({
        error: "",
    });
    const [isSearchRequired, setIsSearchRequired] = useState(true);
    const [showingId, setShowingId] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const {user} = useContext(UserContext)

    return <main>
        <HomeLink />
        {user.role !== "staff" || !user.email ? 
        (
            <p className="text-2xl lg:text-3xl mt-10 lg:mt-14 px-3">Please log in as staff to add an event</p>
        ) : (
            isSearchRequired ? (
                <FilmSearch
                    filmDetails={filmDetails}
                    setFilmDetails={setFilmDetails}
                    setIsSearchRequired={setIsSearchRequired}
                />
            ) : isPosting ? (
                <Loading />
            ) : showingId === "" ? (
                <EventForm
                    filmDetails={filmDetails}
                    setShowingId={setShowingId}
                    setIsPosting={setIsPosting}
                />
            ) : (
                <PostSuccessMessage showingId={showingId} />
            )
        )}
    </main>
}

export default CreateShowing;
