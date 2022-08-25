import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  CardOverlayContainer
} from "../../../assets/styled_components/Panel";
import { InputWrapComponent } from "../../../assets/styled_components/SmallComponents";
import { getTagList } from "../../db/article.service";
import {
  getLocalStorageTheme,
  initialState,
  reducer
} from "../../db/reducer/reducer";
import { Article } from "../../model/Article";
import {
  displayAlertErrorPopup,
  displayAlertInfoPopup
} from "../small_components/AlertInfoPopup";
import { SquareButtonProps } from "../small_components/ui/Button";
import MyEditor from "./test_components/DraftJS";

/**
 * useRef: reference to React html components
 *
 * @param props
 * @returns
 */
const AddArticleComponent = (props: any) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const shortDescRef = useRef<HTMLInputElement>(null);
  const imageLinkRef = useRef<HTMLInputElement>(null);
  const TextEditor = React.forwardRef((props, ref) => (
    <MyEditor id="desc" ref={ref}>
      {props}
    </MyEditor>
  ));
  const descRef = React.createRef();

  const [tags, setTags] = useState([""]);
  // get tag list
  useEffect(() => {
    getTagList(true).then((data) => setTags(data));
  }, []);

  async function handleSelectorChangeTag(event: any) {
    // set list page value to useState
    displayAlertInfoPopup("Tag " + event?.target.value + " " + "selected!");
    setSelectorValueTag(event?.target.value);
  }

  const onComponentChange = (componentName: string | undefined, event: any) => {
    // displayAlertInfoPopup(event?.target.value)
    if (componentName == "titleValue") {
      localStorage.setItem("addNewArticle_title", JSON.stringify(titleValue));
      setTitleValue(event?.target.value);
      setTitleValue(titleRef.current?.value || "");
    }
    if (componentName == "shortDescValue") {
      localStorage.setItem(
        "addNewArticle_shortDesc",
        JSON.stringify(shortDescValue)
      );
      setShortDescValue(event?.target.value);
      setShortDescValue(shortDescRef.current?.value || "");
    }
    if (componentName == "imageLinkValue") {
      localStorage.setItem(
        "addNewArticle_imageLink",
        JSON.stringify(imageLinkValue)
      );
      setImageLinkValue(event?.target.value);
      setImageLinkValue(imageLinkRef.current?.value || "");
    }
  };
  let titleLocalstorageExisted = false;
  let shortDescLocalstorageExisted = false;
  let contentLocalstorageExisted = false;
  let imageLinkLocalstorageExisted = false;
  try {
    titleLocalstorageExisted = localStorage["addNewArticle_title"]
      ? true
      : false;
    shortDescLocalstorageExisted = localStorage["addNewArticle_shortDesc"]
      ? true
      : false;
    contentLocalstorageExisted = localStorage["addNewArticle_longDesc"]
      ? true
      : false;
    imageLinkLocalstorageExisted = localStorage["addNewArticle_imageLink"]
      ? true
      : false;
  } catch (error) {
    displayAlertErrorPopup("error_Localstorage notExisted");
  }

  // declare initial value
  const [titleValue, setTitleValue] = useState(
    titleLocalstorageExisted
      ? JSON.parse(localStorage["addNewArticle_title"])
      : "This is an example"
  );
  const [shortDescValue, setShortDescValue] = useState(
    shortDescLocalstorageExisted
      ? JSON.parse(localStorage["addNewArticle_shortDesc"])
      : "Short description to describe your article..."
  );
  const [contentValue, setContentValue] = useState(
    contentLocalstorageExisted
      ? JSON.parse(localStorage["addNewArticle_longDesc"])
      : "insert article content here...\n...\nline1"
  );
  const [imageLinkValue, setImageLinkValue] = useState(
    imageLinkLocalstorageExisted
      ? JSON.parse(localStorage["addNewArticle_imageLink"])
      : "https://lh5.googleusercontent.com/37KZ8tSRuvBXqMcIPbYSnXMcYzDIwOohsAP3LvFGo0ukNbcOtOW8kyKR737uUog7XhBK-hC71H-bT6F3MXTjI9W8XXzgjeYU0U0MPiXJf6Yn4HcV6wllih_khJ-IJMQc56hFMb-s"
  );
  const [selectorValueTag, setSelectorValueTag] = useState("no tag");

  // click "Add new post" button
  function submitHandler(event: any) {
    event.preventDefault();

    // could add validation here...

    setTitleValue(titleRef.current?.value || "");
    setShortDescValue(shortDescRef.current?.value || "");
    try {
      setContentValue(JSON.parse(localStorage["addNewArticle_longDesc"]) || "");
    } catch (error) {
      displayAlertErrorPopup(
        "fetching localStorage addNewArticle_longDesc error!"
      );
    }
    setImageLinkValue(imageLinkRef.current?.value || "");
    localStorage.setItem("addNewArticle_title", JSON.stringify(titleValue));
    localStorage.setItem(
      "addNewArticle_shortDesc",
      JSON.stringify(shortDescValue)
    );
    localStorage.setItem(
      "addNewArticle_imageLink",
      JSON.stringify(imageLinkValue)
    );
    let tagValue: string[];
    if (selectorValueTag == "no tag") {
      tagValue = [""];
    } else {
      tagValue = [selectorValueTag];
    }
    const newArticle = new Article(
      titleValue || " ",
      shortDescValue || " ",
      // descRef.current?.value || " ",
      contentValue || " ",
      imageLinkValue || " ",
      0,
      tagValue,
      "",
      new Date(), 
      new Date(),
      ""
    );
    console.log(newArticle);
    props.onAddArticle(newArticle);
  }

  const [state] = useReducer(reducer, initialState);
  const currentTheme = getLocalStorageTheme();
  console.log(initialState.currentTheme.id);
  console.log(currentTheme.id);

  return (
    <CardOverlayContainer
      disableBorder={false}
      themeId={currentTheme.id}
      theme={currentTheme}
      borderRadius={15}
      borderWidth={1}
    >
      <form onSubmit={submitHandler}>
        <InputWrapComponent padding={5}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            ref={titleRef}
            defaultValue={titleValue}
            onChange={(event) => onComponentChange("titleValue", event)}
          />

          {/* select post tag */}
          <select
            title="yes"
            onChange={handleSelectorChangeTag}
            value={selectorValueTag}
            defaultValue="no tag"
            className="float-right"
          >
            {tags.map((item, index) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </InputWrapComponent>
        <InputWrapComponent padding={5}>
          <label htmlFor="shortDesc">Short Description</label>
          <input
            type="text"
            id="shortDesc"
            ref={shortDescRef}
            defaultValue={shortDescValue}
            onChange={(event) => onComponentChange("shortDescValue", event)}
          />
        </InputWrapComponent>
        <InputWrapComponent padding={5}>
          <label htmlFor="desc">Content</label>
          {/* <textarea
            rows={5}
            id="desc"
            ref={descRef}
            defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia..."
          ></textarea> */}
          <TextEditor ref={descRef}></TextEditor>
        </InputWrapComponent>
        <InputWrapComponent padding={5}>
          <label htmlFor="imageLink">
            Image (direct link to image on the web)
          </label>
          <input
            type="text"
            id="imageLink"
            ref={imageLinkRef}
            defaultValue={imageLinkValue}
            onChange={(event) => onComponentChange("imageLinkValue", event)}
          />
        </InputWrapComponent>
        <InputWrapComponent padding={5}>
          <SquareButtonProps type="submit">Add new post</SquareButtonProps>
        </InputWrapComponent>
      </form>
    </CardOverlayContainer>
  );
};

export default AddArticleComponent;
