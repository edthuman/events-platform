import axios from "axios";

export async function getFilmDetails(omdbKey: string, filmName: string) {
    try {
        const response: any = await axios.get(
            `https://www.omdbapi.com/?apikey=${omdbKey}&t=${filmName}`
        );
    
        if (response.data.Response === "False") {
            return { error: "Film details could not be retrieved" }
        }

        const { Director, Runtime, Genre, Plot, Rated, Year, imdbID } =
            response.data;

        return {
            director: Director,
            runtime: Runtime,
            genre: Genre,
            plot: Plot,
            rating: Rated,
            year: Year,
            imdbId: imdbID,
        };
    }
    catch (err) {
        return { error: "Something went wrong whilst retrieving film details" }
    }
}

export async function findFilm(omdbKey: string, e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()

    const filmName = e.target[0].value

    const response = await axios.get(`http://www.omdbapi.com/?apikey=${omdbKey}&t=${filmName}`)

    const { Actors, Director, Plot, Poster, Title, Year  } = response.data

    return {
        title: Title,
        year: Year,
        actors: Actors,
        director: Director,
        poster: Poster,
        plot: Plot
    }
}