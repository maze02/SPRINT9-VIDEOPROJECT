import styled from "styled-components";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FavoritesContext } from "./store/FavoritesCtx";

const FavoritesItem = ({
  id,
  title,
  handleVideoSelect,
  videoListState,
  videoListType,
  url,
}) => {
  const { toggleFavorite } = useContext(FavoritesContext);
  return (
    <Wrapper>
      <div className="container">
        <img src={url} alt={title} />
        <div className="heart">
          <FontAwesomeIcon className="heart-icon" icon={faHeart} />
        </div>
        <div className="links-wrapper">
          <div
            className="link play"
            onClick={() => {
              handleVideoSelect(id, videoListType);
            }}
          >
            <FontAwesomeIcon icon={faPlay} />
          </div>
          <div
            className="link trash"
            onClick={() => {
              toggleFavorite(id, videoListType, videoListState);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  align-self: center;
  justify-self: center;
  justify-content: center;
  align-content: center;
  width: 100%;
  .container {
    justify-content: center;
    align-self: center;
    justify-self: center;
    position: relative;
    background: var(--clr-black);
    max-width: 20rem;
    margin-bottom: 1rem;
    img {
      width: 100%;
      display: block;
      object-fit: cover;
      border-radius: var(--radius);
      transition: all 0.3s linear;
      border-radius: 0.3rem;
    }
    .heart {
      border-radius: 0rem 0.3rem 0.3rem 0rem;
      top: 50%;
      left: 75%;
      position: absolute;
      transform: translate(-50%, -50%);
      background: black;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      height: 100.5%;
      transition: all 0.3s linear;
      opacity: 0.7;
      cursor: pointer;
      svg {
        font-size: 1.3rem;
        color: red;
      }
    }
    .links-wrapper {
      .link {
        top: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        transition: all 0.3s linear;
        opacity: 0;
        cursor: pointer;
        svg {
          font-size: 1.3rem;
          color: black;
        }
      }
      .play {
        left: 40%;
      }
      .trash {
        left: 60%;
      }
    }

    &:hover img {
      opacity: 0.7;
    }
    &:hover .link {
      opacity: 1;
    }

    &:hover .heart {
      opacity: 0;
    }
  }
  @media screen and (min-width: 578px) {
    .container {
      margin-bottom: 0rem;
    }
  }
`;
export default FavoritesItem;
