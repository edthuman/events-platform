import { useState } from "react";
import { BooleanStateSetter, SetFilmDetails } from "../../../types";
import { findFilmDetails } from "../event-handlers";
import { Link } from "react-router-dom";
import { handleTextInput } from "../../event-handlers";
import { FilmPreviewResponse } from "../../../server/omdb-types";

function SearchForm({
    filmDetails,
    setFilmDetails,
    omdbKey,
    setIsLoading,
}: {
    filmDetails: FilmPreviewResponse;
    setFilmDetails: SetFilmDetails;
    omdbKey: string;
    setIsLoading: BooleanStateSetter;
}) {
    const [isNameSearch, setIsNameSearch] = useState(true);
    const [textInput, setTextInput] = useState("");
    const linkStyling = "border lg:text-lg w-3/6 md:w-5/12 lg:w-3/12 block mx-auto mt-5 hover:text-grey";

    return (
        <>
            <p className="text-2xl my-4">
                Search by {isNameSearch ? "name" : "IMDb ID"}:
            </p>
            {isNameSearch ? null : (
                <p className="text-lg mb-4 lg:px-10 lg:text-xl">
                    An IMDb ID can be found by searching a film on{" "}
                    <Link to="https://www.imdb.com" target="_blank" className="underline hover:text-grey hover:no-underline">
                        imdb.com
                    </Link>
                    , then copying the part of the URL just after title (between
                    the two slashes) which begins 'tt'
                </p>
            )}
            <form
                onSubmit={(e) =>
                    findFilmDetails(
                        e,
                        textInput,
                        setFilmDetails,
                        omdbKey,
                        setIsLoading,
                        isNameSearch
                    )
                }
            >
                <label
                    className="mr-2 lg:mr-3 lg:text-xl"
                    htmlFor={`film-${isNameSearch ? "name" : "id"}`}
                >
                    {isNameSearch ? "Name" : "IMDb ID"}:
                </label>
                <input
                    id={`film-${isNameSearch ? "name" : "id"}`}
                    type="text"
                    onChange={(e) => handleTextInput(e, setTextInput)}
                    value={textInput}
                    className="text-black px-2 py-1 mb-3 lg:text-lg"
                />
                {filmDetails.error ? (
                    <p className="text-xl mt-2 py-1 bg-red w-5/6 mx-auto rounded-lg">
                        {filmDetails.error}
                    </p>
                ) : null}
                <button type="submit" className={linkStyling}>
                    Find Film
                </button>
                <button
                    type="button"
                    className={linkStyling}
                    onClick={() =>
                        setIsNameSearch((currValue: boolean) => !currValue)
                    }
                >
                    Search by {isNameSearch ? "IMDb ID" : "film name"}
                </button>
            </form>
        </>
    );
}

export default SearchForm;
