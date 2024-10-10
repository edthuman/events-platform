import { FilmPreviewResponse } from "../../../server/omdb-types";
import { BooleanStateSetter } from "../../../types";
import { handleFilmFound, handleIncorrectFilmFound } from "../event-handlers";
import FilmPreview from "./FilmPreview";

function FilmSearchResponse({
    filmDetails,
    setFilmDetails,
    setIsSearchRequired,
}: {
    filmDetails: FilmPreviewResponse;
    setFilmDetails: any;
    setIsSearchRequired: BooleanStateSetter;
}) {
    // TypeScript error on FilmPreview component can be ignored - filmDetails having more than 1 key means it has type FilmPreviewDetails

    return (
        <>
            {filmDetails.error ? <p>{filmDetails.error}</p> : null}
            {Object.keys(filmDetails).length > 1 ? (
                <>
                    <FilmPreview filmDetails={filmDetails} />
                    <p>Are these details correct?</p>
                    <button
                        onClick={() => handleFilmFound(setIsSearchRequired)}
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => handleIncorrectFilmFound(setFilmDetails)}
                    >
                        No
                    </button>
                </>
            ) : null}
        </>
    );
}

export default FilmSearchResponse;
