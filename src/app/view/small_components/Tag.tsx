import React, { useState } from "react";

// Display a "Like" <button>
function LikeButton(props: any) {
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
      <button onClick={() => changeLike()}><i className={`fa-star ` + (liked ? 'fa-solid' : 'fa-regular')}></i> {likeCount}</button>
    </>
  );
}

export default LikeButton;
