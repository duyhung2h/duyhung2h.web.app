import React from "react";
import { InfoCard } from "../../../assets/styled_components/Panel";

import classes from "./../../../assets/scss/index.module.scss";

const InfoCardComponent = (props: any) => {
  return (
    <a href={props.infoCard.link} target={"_blank"}>
      <InfoCard className='row'>
        <InfoCard className="col-8 info_card__left">
          <h4>{props.infoCard.title}</h4>
          <p>{props.infoCard.shortDesc}</p>
          <p>{props.infoCard.subText}</p>
        </InfoCard>
        <div className="col-4">
          <div
            style={{ background: `url(${props.infoCard.iconPath})` }}
            className="col-4 icon"
          >
            <div className="col-12">click me!</div>
            {/* <img className="img-responsive" src={props.infoCard.iconPath} alt="" /> */}
          </div>
        </div>
      </InfoCard>
    </a>
  );
};

export default InfoCardComponent;
