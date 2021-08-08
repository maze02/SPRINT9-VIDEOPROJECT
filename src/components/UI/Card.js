import styled from "styled-components";

const CardSecondary = ({ children, id, pressed }) => {
  const clickVideo = () => {
    pressed(id);
  };
  return <Wrapper onClick={clickVideo}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  /*  width: 90vw; */
  width: 100%;
  margin-bottom: 1rem;
  min-width: 200px;
  background: grey;
  border-radius: 0.25rem;
  cursor: pointer;

  img {
    width: 100%;
    border-radius: 0.25rem 0.25rem 0rem 0rem;
  }

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
`;

export default CardSecondary;
