import styled from "styled-components";

const CardSecondary = ({ children, id, videoListType, pressed }) => {
  const clickVideo = () => {
    pressed(id, videoListType);
  };
  return <Wrapper onClick={clickVideo}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  /*  width: 90vw; */
  display: grid;
  grid-template-rows: 1fr 0.5fr;
  width: 100%;
  margin: 0rem 1rem 1rem 0rem;
  padding-bottom: 1rem;
  min-width: 200px;
  background-color: grey;
  border-radius: 0.25rem;
  cursor: pointer;
  //flex: 0 0 auto;
  img {
    width: 100%;
    border-radius: 0.25rem 0.25rem 0rem 0rem;
  }
  .secondary-card-text {
    display: grid;
    grid-template-rows: 1fr 1fr;
    margin: 0rem 1rem 0rem 1rem;
  }
  .description-brief {
    display: flex;
    margin-top: 0.6rem;
    h5 {
      margin-top: 0rem;
      margin-bottom: 0rem;
    }

    p {
      margin-top: -0.7rem;
      padding-bottom: 2rem;
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: -1rem;
    margin-bottom: -1rem;
    p {
      font-size: 0.8rem;
    }
  }
`;

export default CardSecondary;
