import React, { useReducer, useRef } from "react";
import { CardLogin } from "../../../assets/styled_components/Panel";
import { InputWrapComponent } from "../../../assets/styled_components/SmallComponents";
import { getLocalStorageTheme, initialState, reducer } from "../../db/reducer/reducer";
import { Article } from "../../model/Article";
import { SquareButtonProps } from "../small_components/ui/Button";

const AddArticleComponent = (props: any) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const shortDescRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const imageLinkRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: any) {
    event.preventDefault();

    // could add validation here...

    const example = new Article(
      titleRef.current?.value || " ",
      shortDescRef.current?.value || " ",
      descRef.current?.value || " ",
      imageLinkRef.current?.value || " ",
      0,
      [""]
    );

    props.onAddArticle(example);
  }

  const [state] = useReducer(reducer, initialState);
  const currentTheme = getLocalStorageTheme();
  console.log(initialState.currentTheme.id);
  console.log(currentTheme.id);

  return (
    <CardLogin
      disableBorder={false}
      className="overlay-container" themeId={currentTheme.id} theme={currentTheme}
    >
      <form onSubmit={submitHandler}>
        <InputWrapComponent>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            ref={titleRef}
            defaultValue="This is an example"
          />
        </InputWrapComponent>
        <InputWrapComponent>
          <label htmlFor="shortDesc">Short Description</label>
          <input
            type="text"
            id="shortDesc"
            ref={shortDescRef}
            defaultValue="This is some description"
          />
        </InputWrapComponent>
        <InputWrapComponent>
          <label htmlFor="desc">Content</label>
          <textarea
            rows={5}
            id="desc"
            ref={descRef}
            defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia..."
          ></textarea>
        </InputWrapComponent>
        <InputWrapComponent>
          <label htmlFor="imageLink">
            Image (direct link to image on the web)
          </label>
          <input
            type="text"
            id="imageLink"
            ref={imageLinkRef}
            defaultValue="https://lh5.googleusercontent.com/37KZ8tSRuvBXqMcIPbYSnXMcYzDIwOohsAP3LvFGo0ukNbcOtOW8kyKR737uUog7XhBK-hC71H-bT6F3MXTjI9W8XXzgjeYU0U0MPiXJf6Yn4HcV6wllih_khJ-IJMQc56hFMb-s"
          />
        </InputWrapComponent>
        <SquareButtonProps type="submit">
          Add new post
        </SquareButtonProps>
      </form>
    </CardLogin>
  );
};

export default AddArticleComponent;
