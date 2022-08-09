import React, { useRef } from 'react';
import { InputWrapComponent } from '../../../../assets/styled_components/SmallComponents';

import classes from "./../../../../assets/scss/test_scss/Movie.module.scss";

function AddMovie(props: any) {
  const titleRef = useRef<HTMLInputElement>(null);
  const openingTextRef = useRef<HTMLTextAreaElement>(null);
  const releaseDateRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: any) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current?.value,
      openingText: openingTextRef.current?.value,
      releaseDate: releaseDateRef.current?.value,
    };

    props.onAddMovie(movie);
  }

  return (
    <form onSubmit={submitHandler}>
      <InputWrapComponent>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} />
      </InputWrapComponent>
      <InputWrapComponent>
        <label htmlFor='opening-text'>Opening Text</label>
        <textarea rows={5} id='opening-text' ref={openingTextRef}></textarea>
      </InputWrapComponent>
      <InputWrapComponent>
        <label htmlFor='date'>Release Date</label>
        <input type='text' id='date' ref={releaseDateRef} />
      </InputWrapComponent>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
