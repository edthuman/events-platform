import { useState } from "react";
import { BooleanStateSetter, SetFilmDetails } from "../../../types";
import { FilmPreviewResponse } from "../../../server/omdb-types";
import Loading from "../../Loading";
import FilmSearchResponse from "./FilmSearchResponse";
import SearchForm from "./SearchForm";

const omdbKey = import.meta.env.VITE_OMDB_KEY;

function FilmSearch({
    filmDetails,
    setFilmDetails,
    setIsSearchRequired,
}: {
    filmDetails: FilmPreviewResponse;
    setFilmDetails: SetFilmDetails;
    setIsSearchRequired: BooleanStateSetter;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSearchingByName, setIsSearchingByName] = useState(true)

    return (
        <>
            <h1>Start A New Event!</h1>
            {isSearchingByName ? (
                <SearchForm setFilmDetails={setFilmDetails} omdbKey={omdbKey} setIsLoading={setIsLoading} setIsSearchingByName={setIsSearchingByName}/>
            ): null}
            {isLoading ? (
                <Loading />
            ) : (
                <FilmSearchResponse
                    filmDetails={filmDetails}
                    setFilmDetails={setFilmDetails}
                    setIsSearchRequired={setIsSearchRequired}
                />
            )}
        </>
    );
}

export default FilmSearch;
