import axios from "axios";
import { FilmDetailsResponse } from "./omdb-types"

export async function getFilmDetails(omdbKey: string, imdbId: string): Promise<FilmDetailsResponse>{
    try {
        const response: any = await axios.get(
            `https://www.omdbapi.com/?apikey=${omdbKey}&i=${imdbId}`
        );
    
        if (response.data.Response === "False") {
            return { error: "Film details could not be retrieved" }
        }
        
        const { Director, Runtime, Genre, Plot, Rated, Title, Year } =
            response.data;

        return {
            director: Director,
            runtime: Runtime,
            genre: Genre,
            plot: Plot,
            rating: Rated,
            title: Title,
            year: Year,
            error: ""
        };
    }
    catch (err) {
        return { error: "Something went wrong whilst retrieving film details" }
    }
}

export async function findFilm(omdbKey: string, filmName: string){
    try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${omdbKey}&t=${filmName}`)

        if (response.data.Response === "False") {
            return { error: "No film found with that name, please try again" }
        }

        const { Actors, Director, Poster, Title, Year, imdbID } = response.data
        
        return {
            title: Title,
            year: Year,
            actors: Actors,
            director: Director,
            poster: Poster,
            imdbId: imdbID
        }
    }
    catch (err) {
        return { error: "Something went wrong while retrieving film details" }
    }
}