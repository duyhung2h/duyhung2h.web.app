import React, { useCallback, useEffect, useState } from "react";
import AddMovie from "../components/AddMovie";
import MovieList, { Movie } from "../components/MovieList";
import classes from "./../../../assets/scss/Movie.module.scss";

const SecretPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  /**
   * @function fetch(): fetch data through API, first argument string to the API address, second argument for adding various options
   * @function then(): promise function to handle function after a request is finished
   */
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data);

      const transformedMovies = data.results.map((movieData: any) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error: any) {
      setError(error["message"]);
    }
    setIsLoading(false);
  }, []);
  
  // initial fetch movie on site load
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  function addMovieHandler(movie: any) {
    console.log(movie);
    setIsLoading(true);
    setError(null);
    // try {
    //   const response = await fetch("https://swapi.dev/api/films/");
    //   if (!response.ok) {
    //     throw new Error("Something went wrong!");
    //   }

    //   const data = await response.json();
    //   console.log(data);

    //   const transformedMovies = data.results.map((movieData: any) => {
    //     return {
    //       id: movieData.episode_id,
    //       title: movieData.title,
    //       openingText: movieData.opening_crawl,
    //       releaseDate: movieData.release_date,
    //     };
    //   });
    //   setMovies(transformedMovies);
    // } catch (error: any) {
    //   setError(error["message"]);
    // }
    setIsLoading(false);
  }
  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MovieList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  return (
    <React.Fragment>
      <h1>Secret Page to test data</h1>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
};
export default SecretPage;
