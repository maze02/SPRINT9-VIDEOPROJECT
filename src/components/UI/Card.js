import styled from "styled-components";

const CardSecondary = ({ children, id, videoListType, pressed }) => {
  const clickVideo = (e) => {
    console.log("91919191919-ID of CLICK" + e.target.tagName);
    localStorage.setItem("e.target", e.target.tagName);
    if (e.target.tagName !== "svg" && e.target.tagName !== "path") {
      pressed(id, videoListType);
    }
  };
  return <Wrapper onClick={clickVideo}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  color: black;
  max-width: 250px;
  min-width: 200px;
  display: grid;
  grid-template-rows: 60% 30%;
  width: 100%;
  max-width: 13rem;
  margin: 0rem 1rem 0rem 0rem;
  padding-bottom: -1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  //flex: 0 0 auto;
  .img-wrapper {
    width: auto;
    object-fit: cover;
    display: flex;
    border-radius: 0.25rem 0.25rem 0rem 0rem;
    overflow: hidden;
    img {
      display: inline;
      margin: 0 auto;
      width: auto;
      object-fit: contain;
    }
  }
  .secondary-card-text {
    display: grid;
    grid-template-rows: 1fr 0.5fr;
    padding: 0rem 1rem 0rem 1rem;
    background-color: white;
    border-radius: 0rem 0rem 0.25rem 0.25rem;
  }
  .description-brief {
    display: flex;
    margin-top: 0.6rem;
    margin-right: 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    h5 {
      margin-top: 0rem;
      margin-bottom: 0rem;
      text-overflow: ellipsis;
      //clear: both;
      //display: inline-block;
      //overflow: hidden;
      //white-space: nowrap;

      .description-title {
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 150px;
      }
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: -2rem;

    p {
      font-size: 0.8rem;
    }
  }

  .button-heart {
    color: red;
    z-index: 10;
  }
`;

export default CardSecondary;
