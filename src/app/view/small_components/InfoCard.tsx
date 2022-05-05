import React from "react";

import classes from "./../../../assets/scss/index.module.scss";

const InfoCard = (props: any) => {
  return (
    <a href={props.infoCard.link} target={"_blank"}>
      <div className={`${classes.info_card} row`} >
        <div className="col-8 info_card__left">
          <h4>{props.infoCard.title}</h4>
          <p>{props.infoCard.shortDesc}</p>
          <p>{props.infoCard.subText}</p>
        </div>
        <div style={{background: `url(${props.infoCard.iconPath})`}} className="col-2 icon" >
          {/* <img className="img-responsive" src={props.infoCard.iconPath} alt="" /> */}
        </div>
      </div>
    </a>
  );
};

export default InfoCard;
