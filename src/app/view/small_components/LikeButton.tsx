import React, { useState } from "react";
import { updateArticle, updateIPData } from "../../db/article.service";
import { getLocalStorageIPData } from "../../db/reducer/reducer";
import { IPData } from "../../model/IPData";
import { SquareButtonProps } from "./ui/Button";

export function checkLike(articleId_check: number, IPData: IPData) {
  let returnIndex = -1
  IPData.LikedArticles.forEach((articleId: number, index) => {
    if (articleId == articleId_check) {
      returnIndex = index
    }
  });
  return returnIndex
}
/**
 * Display a "Like" <button>
 *
 * @param props
 * @returns
 */
function LikeButton(props: any) {
  const [likeCount, setLikeCount] = useState(props.articleObject.articleLikeCount);
  const [liked, setLiked] = useState(props.liked);
  function changeLike() {
    try {
      let IPData: IPData = getLocalStorageIPData();
      console.log(IPData);
      console.log(IPData.LikedArticles);
      let checkLikedIndex = -1
      checkLikedIndex = checkLike(Number(props.articleObject.articleId), IPData)
      if (checkLikedIndex != -1){
        setLiked(false);
        setLikeCount(likeCount - 1);
        props.articleObject.articleLikeCount--;
        IPData.LikedArticles.splice(checkLikedIndex, 1);
      }else{
        setLiked(true);
        setLikeCount(likeCount + 1);
        props.articleObject.articleLikeCount++;
        IPData.LikedArticles.push(Number(props.articleObject.articleId));
      }
      // update IPData 
      updateIPData(IPData)
      updateArticle(props.articleObject)
      localStorage.setItem("IPData", JSON.stringify(IPData));
      console.log(IPData);
      return null;
    } catch (error) {
      return null;
    }
  }

  return (
    <>
      <SquareButtonProps onClick={() => changeLike()}>
        <i className={`fa-star ` + (liked ? "fa-solid" : "fa-regular")}></i>{" "}
        {likeCount}
      </SquareButtonProps>
    </>
  );
}

export default LikeButton;
