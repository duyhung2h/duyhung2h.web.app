import styled from "styled-components";
import img from "../../assets/images/bg.jpg";

export const BackgroundPanel = styled.div`
  /* background: ${(props) => props.theme.background}; */
  background: ${(props) =>
    props.theme.background == "aokh" ? `url(${img})` : props.theme.background};
`;
export const CardImage = styled.img`
  border-radius: 15px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  position: absolute; /* Take your picture out of the flow */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0; /* Make the picture taking the size of it's parent */
  width: 100%; /* This if for the object-fit */
  height: 100%; /* This if for the object-fit */
  object-fit: cover; /* Equivalent of the background-size: cover; of a background-image */
  object-position: center;
`;
export const CardWrap = styled.div`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 15px;
  padding: 10px;
  position: relative;
  border: 1px solid !important;
  background: ${(props) => props.theme.cardWrap};
  border-color: ${(props) => props.theme.colorBlack};
`;
export const CardContentWrap = styled(CardWrap)`
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`;
export const CardImageWrap = styled(CardWrap)`
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-width: 0px;

  &:after {
    content: "";
    display: block;
    padding-bottom: 60%;
  }
`;
export const InfoCard = styled.div`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 10px;
  border: 1px solid !important;
  /* background: ${(props) => props.theme.Color.infoCardBG};
  border-color: ${(props) => props.theme.Color.colorBlack}; */
  min-height: 20vh;
`;
