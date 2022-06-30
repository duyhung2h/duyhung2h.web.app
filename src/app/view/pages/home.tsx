import React from "react";
import { getInfoList } from "../../db/info.service";
import InfoCard from "../small_components/InfoCard";

const Home = () => {
  const infoList = getInfoList();
  return (
    <React.Fragment>
      <h1>Hello friends, I am duyhung2h</h1>
      <p>
        This is my haven, where I can express myself, post my online tutorials
        and information about my Youtube channel.
      </p>
      {/* <InfoCard className="card" title="desc"></InfoCard> */}
      {infoList.map((value, index) => {
        return (
          <div>
            <InfoCard className="card" infoCard={value}></InfoCard>
            <br />
          </div>
        );
      })}
      <h1>Articles</h1>
      <p>
        Below here you can filter articles by tags, or browse my recent articles.
      </p>
    </React.Fragment>
  );
};
export default Home;
