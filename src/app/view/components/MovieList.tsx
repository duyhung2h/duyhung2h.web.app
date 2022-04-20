import React from "react";

import classes from "./../../../assets/scss/Movie.module.scss";

export const Movie = (props: any) => {
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
    </li>
  );
};
const MovieList = (props: any) => {
  return (
    <ul className={classes["movies-list"]}>
      {props.movies.map((movie: any) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.release}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MovieList;
