import styled from "styled-components";

const CardSecondary = ({ children, id, pressed }) => {
  const clickVideo = () => {
    pressed(id);
  };
  return <Wrapper onClick={clickVideo}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  /*  width: 90vw; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  margin: 0rem 1rem 1rem 0rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid black;
  min-width: 200px;
  /* background: grey;*/
  background-color: white;
  // border-radius: 0.25rem;
  cursor: pointer;
  img {
    width: 100%;
    //border-radius: 0.25rem 0.25rem 0rem 0rem;
  }

  .description-brief {
    margin-right: 1rem;
    display: flex;
    align-items: center;

    h5 {
      margin-top: 1rem;
    }

    p {
      margin-top: -0.7rem;
      padding-bottom: 1rem;
    }
    h5,
    p {
      padding-left: 1rem;
    }
  }
`;

export default CardSecondary;
