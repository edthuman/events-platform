import axios from "axios";

export async function getFilmDetails(omdbKey: string, filmName: string) {
    const response: any = await axios.get(
        `https://www.omdbapi.com/?apikey=${omdbKey}&t=${filmName}`
    );

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