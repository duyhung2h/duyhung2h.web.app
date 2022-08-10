import React from "react";
import { InfoCard } from "../../../assets/styled_components/Panel";
import { InfoCardIcon } from "../../../assets/styled_components/SmallComponents";


const InfoCardComponent = (props: any) => {
  return (
    <>
      <InfoCard borderRadius={10} className="row" borderWidth={1}>
        <InfoCard
          borderRadius={10}
          disableBorderShadow={true}
          className="col-8 info_card__left"
          disableBorder={true}
        >
          <a href={props.infoCard.link} target={"_blank"}>
            <h4>{props.infoCard.title}</h4>
            <p>{props.infoCard.shortDesc}</p>
            <p>{props.infoCard.subText}</p>
          </a>
        </InfoCard>
        <a href={props.infoCard.link} target={"_blank"}>
          <div className="col-4">
              <InfoCardIcon
                style={{ background: `url(${props.infoCard.iconPath})` }}
              >
                <div className="col-12">click me!</div>
              </InfoCardIcon>
          </div>
        </a>
      </InfoCard>
    </>
  );
};

export default InfoCardComponent;
