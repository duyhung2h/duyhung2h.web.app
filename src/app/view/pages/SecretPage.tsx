import React, { useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "../../db/_redux";
import AddMovie from "../components/test_components/AddMovie";
import TextEditor from "../components/test_components/CKEditor";
import Counter from "../components/test_components/Counter";
import MyEditor from "../components/test_components/DraftJS";
import MovieList from "../components/test_components/MovieList";

export function test() {
  const person = { age: 20 };
  const person2 = { ...person }; // shallow copy
  person2.age = 99;
  console.log(person);
  console.log(person2);

}

const SecretPage = () => {
  test();
  let movielist: any[] = [];
  const [movies, setMovies] = useState(movielist);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  /**
   *
   *
   * @function useCallback(): hook to avoid infinite loop by using useState after useEffect
   * @function fetch(): fetch data through API, first argument string to the API address, second argument for adding various options
   * @function then(): promise function to handle function after a request is finished
   */
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/", {
        method: "GET",
      });
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

  const addMovieHandler = async (movie: any) => {
    console.log(movie);
    console.log(JSON.stringify(movie));
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        // "https://my-json-server.typicode.com/duyhung2h/duyhung2h.github.io/posts",
        "https://personal-website-by-duyhung2h-default-rtdb.asia-southeast1.firebasedatabase.app/examples.json",
        {
          // mode: 'no-cors',
          method: "POST",
          // body: JSON.stringify(movie),
          body: JSON.stringify(movie),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        alert("Something went wrong!");
        throw new Error("Something went wrong!");
      }

      console.log(movies);

      var transformedMovies = [...movies];
      transformedMovies.unshift(movie);
      console.log(transformedMovies);

      setMovies(transformedMovies);
    } catch (error: any) {
      alert(error);
      setError(error["message"]);
    }
    setIsLoading(false);
  };
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
      <section><MyEditor/></section>
      
      
      {/* <Provider store={store}>
        <Counter />
      </Provider>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section> */}
    </React.Fragment>
  );
};
export default SecretPage;
