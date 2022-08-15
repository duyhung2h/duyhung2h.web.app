import React, { useEffect, useState } from "react";
import { getTagList } from "../../db/article.service";
import { getInfoList } from "../../db/info.service";
import InfoCardComponent from "../small_components/InfoCard";
import { Tags } from "../small_components/ui/Tag";

const Home = () => {
  const infoList = getInfoList();
  const [tags, setTags] = useState([""]);
  // get tag list
  useEffect(() => {
    getTagList().then((data) => setTags(data));
  }, []);
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
        Below here you can filter articles by tags, or browse my recent
        articles.
      </p>
      <Tags tagList={tags} />
      <div>
        <iframe
          src={`https://discord.com/widget?id=944992591345225800&theme=dark`}
          width={350}
          height={300}
          allowTransparency={true}
          frameBorder={0}
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          title="discord overlay"
        ></iframe>
      </div>
    </React.Fragment>
  );
};
export default Home;
