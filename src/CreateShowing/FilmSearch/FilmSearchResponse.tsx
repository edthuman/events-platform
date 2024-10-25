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
    const linkStyling = "border w-3/6 block mx-auto mt-5 hover:text-grey"

    return (
        <>
            {Object.keys(filmDetails).length > 1 ? (
                <>
                    <FilmPreview filmDetails={filmDetails} />
                    <p className="text-2xl mt-5">Are these details correct?</p>
                    <button
                        onClick={() => handleFilmFound(setIsSearchRequired)}
                        className={linkStyling}
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => handleIncorrectFilmFound(setFilmDetails)}
                        className={linkStyling}
                    >
                        No
                    </button>
                </>
            ) : null}
        </>
    );
}

export default FilmSearchResponse;
