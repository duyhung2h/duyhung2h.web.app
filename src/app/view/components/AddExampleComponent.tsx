import React, { useRef } from "react";
import classes from "../../../assets/scss/index.module.scss";
import { Example } from "../../model/Example";
import Button from "../small_components/Button";
import Card from "../small_components/Card";

const AddExampleComponent = (props: any) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const shortDescRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const imageLinkRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: any) {
    event.preventDefault();

    // could add validation here...

    const example = new Example(
      titleRef.current?.value || " ",
      shortDescRef.current?.value || " ",
      descRef.current?.value || " ",
      imageLinkRef.current?.value || " ",
      0
    );

    props.onAddExample(example);
  }

  return (
    <Card className={`${classes.login} overlay-container`}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            ref={titleRef}
            defaultValue="This is an example"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="shortDesc">Short Description</label>
          <input
            type="text"
            id="shortDesc"
            ref={shortDescRef}
            defaultValue="This is some description"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="desc">Content</label>
          <textarea
            rows={5}
            id="desc"
            ref={descRef}
            defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia..."
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="imageLink">
            Image (direct link to image on the web)
          </label>
          <input
            type="text"
            id="imageLink"
            ref={imageLinkRef}
            defaultValue="https://lh5.googleusercontent.com/37KZ8tSRuvBXqMcIPbYSnXMcYzDIwOohsAP3LvFGo0ukNbcOtOW8kyKR737uUog7XhBK-hC71H-bT6F3MXTjI9W8XXzgjeYU0U0MPiXJf6Yn4HcV6wllih_khJ-IJMQc56hFMb-s"
          />
        </div>
        <Button type="submit" className={classes.btn}>
          Add new post
        </Button>
      </form>
    </Card>
  );
};

export default AddExampleComponent;
