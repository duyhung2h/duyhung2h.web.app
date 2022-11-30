import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { InfoCard } from "../../../assets/styled_components/Panel";
import { getTagList } from "../../db/article.service";
import { getInfoList } from "../../db/info.service";
import InfoCardComponent from "../small_components/InfoCard";
import { Tags } from "../small_components/ui/Tag";

export const Home = (props?: any) => {
  const infoList = getInfoList();
  const [tags, setTags] = useState([""]);
  // get tag list
  useEffect(() => {
    getTagList(false).then((data) => setTags(data));
  }, []);
  return (
    <React.Fragment>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <NavLink to="/">Main</NavLink> {">"}{" "}
      <NavLink
        // style={({ isActive }) => (isActive ? classes.active : {})}
        to="/home"
      >
        Homepage
      </NavLink>
      <h1>Hello friends, I am duyhung2h</h1>
      <p>
        This is my haven, where I can express myself, post my online tutorials
        and information about my Youtube channel.
      </p>
      {/* <InfoCard className="card" title="desc"></InfoCard> */}
      {infoList.map((value, index) => {
        return (
          <div>
            <InfoCardComponent
              className="card"
              infoCard={value}
            ></InfoCardComponent>
            <br />
          </div>
        );
      })}
      <h1>Articles</h1>
      <p>
        Below here you can filter articles by tags (by clicking on the tags), or browse my recent
        articles.
      </p>
      <Tags tagList={tags} props={props} />
      <div>
        <InfoCard
          borderRadius={10}
          disableBorderShadow={true}
          className="col-8 info_card__left"
          disableBorder={true}
        >
          Featured Posts
        </InfoCard>
      </div>
    </React.Fragment>
  );
};
export default Home;
