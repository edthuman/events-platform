import { useState } from "react";
import { findFilmDetails, handleTextInput } from "../event-handlers";
import { BooleanStateSetter, SetFilmDetails } from "../../../types";
import { FilmPreviewResponse } from "../../../server/omdb-types";
import Loading from "../../Loading";
import FilmSearchResponse from "./FilmSearchResponse";

const omdbKey = import.meta.env.VITE_OMDB_KEY;

function FilmSearchForm({
    filmDetails,
    setFilmDetails,
    setIsSearchRequired,
}: {
    filmDetails: FilmPreviewResponse;
    setFilmDetails: SetFilmDetails;
    setIsSearchRequired: BooleanStateSetter;
}) {
    const [filmNameInput, setFilmNameInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <h1>Start A New Event!</h1>
            <p>Search by film name:</p>
            <form
                onSubmit={(e) =>
                    findFilmDetails(
                        e,
                        filmNameInput,
                        setFilmDetails,
                        omdbKey,
                        setIsLoading
                    )
                }
            >
                <label htmlFor="film-name">Name:</label>
                <input
                    id="film-name"
                    type="text"
                    onChange={(e) => handleTextInput(e, setFilmNameInput)}
                    value={filmNameInput}
                />
                <button type="submit">Find Film</button>
            </form>
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

export default FilmSearchForm;
