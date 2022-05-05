import React from "react";

import classes from "./../../../assets/scss/index.module.scss";

const InfoCard = (props: any) => {
  return (
    <a href={props.infoCard.link} target={"_blank"}>
      <div className={`${classes.info_card} ${props.className} row`}>
        <div className="col-8">
          <h4>{props.infoCard.title}</h4>
          <p>{props.infoCard.shortDesc}</p>
          <p>{props.infoCard.subText}</p>
        </div>
        <div className="col-2 " style={{background: `url(${props.infoCard.iconPath})`, height: '100px', width: '100px', position:"fixed", right: '5%', backgroundSize: '100% auto'}}>
          {/* <img className="img-responsive" src={props.infoCard.iconPath} alt="" /> */}
        </div>
      </div>
    </a>
  );
};

export default InfoCard;
