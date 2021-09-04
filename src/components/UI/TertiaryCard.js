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
  width: auto;
  margin-bottom: 0.4rem;
  @media screen and (min-width: 578px) {
    max-width: 30rem;
    padding: 0rem 1rem 0rem 1rem;
  }
  .button-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-right: 0.5rem;
    width: 100%;
    button {
      width: auto;
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

      //    @media screen and (min-width: 578px) {
      //    margin-right: 3rem;
      //    }
    }
  }

  .history-info {
    display: flex;
    justify-content: flex-start;

    .image-cropper {
      margin: 0.5rem 0rem 0.5rem 0rem;
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
      @media screen and (min-width: 578px) {
        margin: 0.5rem 0rem 0.5rem 0rem;
      }
    }
    .history-text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      margin-left: 0.5rem;
      h4 {
        margin-right: 0.3rem;
        margin: 0rem 0.3rem;
      }
      p {
        font-size: small;
        margin: 0rem 0.3rem;
      }
      @media screen and (min-width: 578px) {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 1rem;
        h4 {
          margin-right: 0.3rem;
        }
        p {
          font-size: medium;
        }
      }
    }
  }
`;

export default CardTertiary;
