import { useContext, useState } from "react";
import FilmSearch from "./FilmSearch/FilmSearch";
import EventForm from "./EventForm";
import { FilmPreviewResponse } from "../../server/omdb-types";
import PostSuccessMessage from "./PostSuccessMessage";
import Loading from "../Loading";
import UserContext from "../../hooks/UserContext";

function CreateShowing() {
    const [filmDetails, setFilmDetails] = useState<FilmPreviewResponse>({
        error: "",
    });
    const [isSearchRequired, setIsSearchRequired] = useState(true);
    const [showingId, setShowingId] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const {user} = useContext(UserContext)

    return user.role !== "staff" ? 
    (
        <p className="text-2xl mt-8">Please log in as staff to create an event</p>
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
    );
}

export default CreateShowing;
