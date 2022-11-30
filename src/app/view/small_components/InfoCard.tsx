import React from "react";
import { InfoCard } from "../../../assets/styled_components/Panel";
import { InfoCardIcon } from "../../../assets/styled_components/SmallComponents";
import { ResponsiveComponent } from "../../../assets/responsive/Responsive";

const InfoCardComponent = (props: any) => {
  let rc = ResponsiveComponent(props);
  let responsiveValues = "";
  if (rc.includes("isTabletOrMobile=true") && rc.includes("isPortrait=true")) {
    responsiveValues = "mobile";
  }
  return (
    <>
      {/* check responsive */}
      {responsiveValues}
      {rc.includes("isTabletOrMobile=true") && ""}
      <InfoCard borderRadius={10} className="row" borderWidth={1}>
        <InfoCard
          borderRadius={10}
          disableBorderShadow={true}
          className={`${
            responsiveValues == "mobile" ? "col-12" : "col-6"
          } info_card__left`}
          disableBorder={true}
        >
          <a href={props.infoCard.link} target={"_blank"}>
            <h4>{props.infoCard.title}</h4>
            <p>{props.infoCard.shortDesc}</p>
            <p>{props.infoCard.subText}</p>
          </a>
        </InfoCard>
        <div
          className={`${responsiveValues == "mobile" ? "col-12" : "col-3"}`}
          style={{ zIndex: 1 }}
        >
          {/* show discord panel if card is discord */}
          {props.infoCard.title === "Discord Server" ? (
            <iframe
              src={`https://discord.com/widget?id=944992591345225800&theme=dark`}
              allowTransparency={true}
              frameBorder={0}
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              title="discord overlay"
            ></iframe>
          ) : (
            ""
          )}
        </div>
        <div
          className={`${responsiveValues == "mobile" ? "col-12" : "col-2"}`}
          style={{ zIndex: 2}}
        >
          <a href={props.infoCard.link} target={"_blank"}>
            <InfoCardIcon
              style={{ background: `url(${props.infoCard.iconPath})` }}
            >
              <div className="col-12">click me!</div>
            </InfoCardIcon>
          </a>
        </div>
      </InfoCard>
    </>
  );
};

export default InfoCardComponent;
