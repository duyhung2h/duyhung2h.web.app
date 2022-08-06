import React from "react";
import { InfoCard } from "../../../assets/styled_components/Panel";

import classes from "./../../../assets/scss/index.module.scss";

const InfoCardComponent = (props: any) => {
  return (
    <>
      <InfoCard className="row" disableBorder={false}>
        <InfoCard className="col-8 info_card__left">
          <a href={props.infoCard.link} target={"_blank"}>
            <h4>{props.infoCard.title}</h4>
            <p>{props.infoCard.shortDesc}</p>
            <p>{props.infoCard.subText}</p>
          </a>
        </InfoCard>
        <a href={props.infoCard.link} target={"_blank"}>
          <div className="col-4">
            <div
              style={{ background: `url(${props.infoCard.iconPath})` }}
              className="col-4 icon"
            >
              <div className="col-12">click me!</div>
            </div>
          </div>
        </a>
      </InfoCard>
    </>
  );
};

export default InfoCardComponent;
