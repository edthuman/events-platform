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
    const linkStyling = "w-3/6 md:w-5/12 lg:w-3/12 block mx-auto mt-5 hover:text-grey";
    const buttonTextStyling = "text-lg lg:text-xl py-3 border"
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
                        <p className={buttonTextStyling}>Yes</p>
                    </button>
                    <button
                        onClick={() => handleIncorrectFilmFound(setFilmDetails)}
                        className={linkStyling}
                    >
                        <p className={buttonTextStyling}>No</p>
                    </button>
                </>
            ) : null}
        </>
    );
}

export default FilmSearchResponse;
