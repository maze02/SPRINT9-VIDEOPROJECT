import styled from "styled-components";

const CardSecondary = ({ children, id, videoListType, pressed }) => {
  const clickVideo = (e) => {
    console.log("91919191919-ID of CLICK tagName" + e.target.tagName);
    localStorage.setItem("e.target", e.target.tagName);
    if (e.target.tagName !== "svg" && e.target.tagName !== "path") {
      pressed(id, videoListType);
    }
  };
  return <Wrapper onClick={clickVideo}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  color: black;
  width: 100%;
  max-width: 250px;
  max-width: 13rem; //208px
  height: 11.9rem;
  padding-top: 1rem;
  padding-bottom: -1rem;
  display: grid;
  grid-template-rows: 60% 30%;
  margin: 0rem 1rem 0rem 0rem;
  cursor: pointer;
  transition: transform 450ms;

  &:hover {
    transform: scale(1.05);
  }

  .img-wrapper {
    width: auto;
    object-fit: cover;
    display: flex;
    border-radius: 0.5rem 0.5rem 0rem 0rem;
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
    border-radius: 0rem 0rem 0.5rem 0.5rem;
  }
  .description-brief {
    display: flex;
    margin-top: 0.4rem;
    margin-right: 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    h5 {
      margin-top: 0rem;
      padding-bottom: 1rem;
      text-overflow: ellipsis;

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
    margin-top: -1.8rem;
    padding-top: 1.2rem;
    p {
      font-size: 0.8rem;
    }
  }

  .button-heart {
    color: red;
    z-index: 10;
    transition: transform 450ms;
    &:hover {
      transform: scale(1.2);
      cursor: pointer;
      svg {
        path {
          fill: red;
        }
      }
    }
  }
`;

export default CardSecondary;
