import styled from "styled-components";

const CardTertiary = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  align-items: center;
  border-radius: 0.4rem;
  background-color: grey;
  max-width: 40rem;
  margin-bottom: 0.4rem;
  .button-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-right: 3rem;
    button {
      box-shadow: 0px 0px 0px transparent;
      text-shadow: 0px 0px 0px transparent;
      border-radius: 0.4rem;
      background-color: red;
      color: white;
      padding: 0.5rem 0.7rem;
      border: none;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 600;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .history-info {
    display: flex;
    justify-content: flex-start;

    .image-cropper {
      margin: 0.5rem 0rem 0.5rem 1rem;
      width: 4rem;
      height: 4rem;
      position: relative;
      overflow: hidden;
      border-radius: 50%;
      img {
        display: inline;
        margin: 0 auto;
        margin-left: -25%; //centers the image
        margin-top: -35%;
        height: 170%;
        width: auto;
      }
    }
    .history-text {
      display: flex;
      align-items: center;
      margin-left: 1rem;
      h4 {
        margin-right: 1rem;
      }
    }
  }
`;

export default CardTertiary;
