import axios from "axios";

export async function getFilmDetails(omdbKey: string, filmName: string) {
    try {
        const response: any = await axios.get(
            `https://www.omdbapi.com/?apikey=${omdbKey}&t=${filmName}`
        );
    
        if (!response.Response) {
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