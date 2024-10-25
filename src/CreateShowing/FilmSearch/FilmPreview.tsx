import { FilmPreviewDetails } from "../../../server/omdb-types";

function FilmPreview({ filmDetails }: { filmDetails: FilmPreviewDetails }) {
    const textStyling = "text-2xl mt-3"
    return (
        <>
            <div className="mt-6 mb-4">
                <p className={textStyling + " underline"}>Details found:</p>
                <p className={textStyling}>Title: {filmDetails.title}</p>
                <p className={textStyling}>Year of Release: {filmDetails.year}</p>
                <p className={textStyling}>Director: {filmDetails.director}</p>
                <p className={textStyling}>Actors: {filmDetails.actors}</p>
            </div>
            <img
                src={filmDetails.poster}
                alt={`Poster for ${filmDetails.title}`}
                className="mx-auto size-8/12"
            />
        </>
    );
}

export default FilmPreview;