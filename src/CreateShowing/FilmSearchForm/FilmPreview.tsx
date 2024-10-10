import { FilmPreviewDetails } from "../../../server/omdb-types";

function FilmPreview({ filmDetails }: { filmDetails: FilmPreviewDetails }) {
    return (
        <>
            <p>Details found:</p>
            <p>Title: {filmDetails.title}</p>
            <p>Year of Release: {filmDetails.year}</p>
            <p>Actors: {filmDetails.actors}</p>
            <p>Director: {filmDetails.director}</p>
            <img
                src={filmDetails.poster}
                alt={`Poster for ${filmDetails.title}`}
            />
        </>
    );
}

export default FilmPreview;
