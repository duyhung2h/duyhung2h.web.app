import React, { useState } from "react";
import { SquareButton } from "./ui/Button";

// Display a "Like" <button>
function TagButton(props: any) {
  const [likeCount, setLikeCount] = useState(props.likeCount);
  const [liked, setLiked] = useState(props.liked);
  function changeLike() {
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
    }
  }
  
  return (
    <> 
      <SquareButton onClick={() => changeLike()}><i className={`fa-star ` + (liked ? 'fa-solid' : 'fa-regular')}></i> {likeCount}</SquareButton>
    </>
  );
}

export default TagButton;
