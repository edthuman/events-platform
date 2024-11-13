function FilmPreview({ filmDetails }: { filmDetails: any }) {
    const textStyling = "text-2xl mt-3"
    return (
        <article>
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
                className="mx-auto w-7/12 sm:w-5/12 md:w-4/12 lg:w-3/12"
            />
        </article>
    );
}

export default FilmPreview;