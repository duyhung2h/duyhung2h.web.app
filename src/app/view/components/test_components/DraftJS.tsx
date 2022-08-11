import { AtomicBlockUtils, Editor, EditorState, RichUtils } from "draft-js";
import React, { useRef, useState } from "react";
import "../../../../assets/css/draftjs.css";
import { displayAlertErrorPopup } from "../../small_components/AlertInfoPopup";

export default function MyEditor(props: any) {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const boldText = () => {
    const nextState = RichUtils.toggleInlineStyle(editorState, "BOLD");

    setEditorState(nextState);
  };
  const italicText = () => {
    const nextState = RichUtils.toggleInlineStyle(editorState, "ITALIC");

    setEditorState(nextState);
  };
  const insertImage = (editorState: any, base64: any) => {
    displayAlertErrorPopup("insertImage")
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
      <input
        placeholder="input text here"
        ref={inputFileToLoad}
        type="file"
        onChange={useEncodeImageFileAsURL}
        alt="sdasd"
        key={keyImage}
      />
      <div id="imgTest"></div>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
}
