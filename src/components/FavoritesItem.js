import styled from "styled-components";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FavoritesContext } from "./store/FavoritesCtx";

const FavoritesItem = ({
  id,
  title,
  handleVideoSelect,
  description,
  videoListState,
  videoListType,
  url,
  date,
  favorite,
}) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
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
            <FontAwesomeIcon icon={faPlayCircle} />
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
  .container {
    position: relative;
    background: var(--clr-black);
    max-width: 20rem;
    //border-radius: var(--radius);
  }
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
    height: 100%;
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
      background: black;
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
        color: #fff;
      }
    }
    .play {
      left: 40%;
    }
    .trash {
      left: 60%;
    }
  }

  .container:hover img {
    opacity: 0.7;
  }
  .container:hover .link {
    opacity: 1;
  }

  .container:hover .heart {
    opacity: 0;
  }
`;
export default FavoritesItem;
