import {
    AtomicBlockUtils, ContentState, convertToRaw, Editor,
    EditorState, RichUtils
} from "draft-js";
import React, { useRef, useState } from "react";
import "../../../../assets/css/draftjs.css";
import {
    displayAlertErrorPopup,
    displayAlertInfoPopup
} from "../../small_components/AlertInfoPopup";

/**
 * Text editor using DraftJS
 * 
 * @param props 
 * @returns 
 */
export default function MyEditor(props: any) {
  let initialValue = "insert article content here...\n...\nline1";
  try {
    initialValue = JSON.parse(localStorage["addNewArticle_longDesc"]);
  } catch (error) {}
  const convertToText = (editorState: any) => {
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const mappedBlocks = blocks.map(
      (block) => (!block.text.trim() && "\n") || block.text
    );

    let newText = "";
    for (let i = 0; i < mappedBlocks.length; i++) {
      const block = mappedBlocks[i];

      // handle last block
      if (i === mappedBlocks.length - 1) {
        newText += block;
      } else {
        // otherwise we join with \n, except if the block is already a \n
        if (block === "\n") newText += block;
        else newText += block + "\n";
      }
      console.log(block);

      // displayAlertInfoPopup(block)
    }
    return newText;
  };

  const editorRef = useRef();
  const [editorState, setEditorState] = React.useState(() =>
    // EditorState.createEmpty()
    EditorState.createWithContent(ContentState.createFromText(initialValue))
  );
  const updateText = (editorState: any) => {
    // console.log(editorState.getCurrentContent().getPlainText("\u0001"));
    console.log(convertToText(editorState));
    localStorage.setItem(
      "addNewArticle_longDesc",
      JSON.stringify(convertToText(editorState))
    );

    setEditorState(editorState);
  };
  const boldText = () => {
    const nextState = RichUtils.toggleInlineStyle(editorState, "BOLD");
    setEditorState(nextState);
  };
  const italicText = () => {
    const nextState = RichUtils.toggleInlineStyle(editorState, "ITALIC");

    setEditorState(nextState);
  };
  const insertImage = (editorState: any, base64: any) => {
    displayAlertInfoPopup("insertImage");
    console.log(base64);

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      { src: base64 }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
  };
  const onAddImage = (base64: string) => {
    const newEditorState = insertImage(editorState, base64);
    setEditorState(newEditorState);
  };
  const inputFileToLoad = useRef<HTMLInputElement>(null);
  const [keyImage, setKeyImage] = useState("");
  function useEncodeImageFileAsURL(props: any) {
    console.log(inputFileToLoad);
    var filesSelected = inputFileToLoad;
    setKeyImage(filesSelected.current?.value || "");
    if (filesSelected.current?.value.length || "".length > 0) {
      var fileToLoad = new File([], inputFileToLoad.current?.value || "");
      console.log(inputFileToLoad.current?.value);

      var fileReader = new FileReader();

      fileReader.onload = function (fileLoadedEvent: any) {
        console.log(fileLoadedEvent);

        var srcData = fileLoadedEvent.target.result; // <--- data: base64
        console.log(srcData);
        onAddImage(srcData);
        displayAlertErrorPopup("Converted Base64 version is " + srcData);
        console.log("Converted Base64 version is " + srcData);
      };
      fileReader.readAsDataURL(fileToLoad);
      console.log(fileReader);
    }
  }
  return (
    <div>
      <button type="button" onClick={boldText}>
        <b>B</b>
      </button>
      <button type="button" onClick={italicText}>
        <i>I</i>
      </button>
      <button className="inline styleButton">
        <i
          className="material-icons"
          style={{
            fontSize: "16px",
            textAlign: "center",
            padding: "0px",
            margin: "0px",
          }}
        >
          image
        </i>
      </button>
      {/* <input
        placeholder="input text here"
        ref={inputFileToLoad}
        type="file"
        onChange={useEncodeImageFileAsURL}
        alt="alt"
        key={keyImage}
      /> */}
      <div id="imgTest"></div>
      <Editor
        ref={editorRef}
        defaultValue={initialValue}
        editorState={editorState}
        onChange={(newState) => updateText(newState)}
      />
    </div>
  );
}
