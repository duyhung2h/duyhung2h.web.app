import React from "react";
import { Editor, EditorState, RichUtils, AtomicBlockUtils } from "draft-js";
import "../../../../assets/css/draftjs.css";
import { mediaBlockRenderer } from "./entities/mediaBlockRenderer";

export default function MyEditor() {
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

  const onAddImage = (e: any) => {
    e.preventDefault();
    const urlValue = window.prompt("Paste Image Link");
    const contentState = editorState.getCurrentContent();
    console.log(contentState);
    
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      { src: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      "create-entity"
    );
    setEditorState(newEditorState
    );
  };
  return (
    <div>
      <button type="button" onClick={boldText}>
        <b>B</b>
      </button>
      <button type="button" onClick={italicText}>
        <i>I</i>
      </button>
          <button className="inline styleButton" onClick={onAddImage}>
            <i
              className="material-icons"
              style={{
                fontSize: "16px",
                textAlign: "center",
                padding: "0px",
                margin: "0px"
              }}
            >
              image
            </i>
          </button>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
}
