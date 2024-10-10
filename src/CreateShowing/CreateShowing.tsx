import { useState } from "react";
import FilmSearchForm from "./FilmSearchForm/FilmSearchForm";
import EventForm from "./EventForm";
import { FilmPreviewResponse } from "../../server/omdb-types";
import PostSuccessMessage from "./PostSuccessMessage";
import Loading from "../Loading";

function CreateShowing() {
    // TypeScript error on EventForm component can be ignored - isSearchRequired is only set to true when filmDetails are of type FilmPreviewDetails
    const [filmDetails, setFilmDetails] = useState<FilmPreviewResponse>({
        error: "",
    });
    const [isSearchRequired, setIsSearchRequired] = useState(true);
    const [showingId, setShowingId] = useState("");
    const [isPosting, setIsPosting] = useState(false);

    return isSearchRequired ? (
        <FilmSearchForm
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
    );
}

export default CreateShowing;
