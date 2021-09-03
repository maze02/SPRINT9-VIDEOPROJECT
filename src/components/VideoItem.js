import CardSecondary from "./UI/Card";
import { useContext, useEffect } from "react";
import { FavoritesContext } from "./store/FavoritesCtx";
import { VideoSearchContext } from "../components/store/VideoSearchCtx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
const VideoItem = ({
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
  const { buttonHeart } = useContext(VideoSearchContext);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  //{title.substring(0, 21)}
  return (
    <CardSecondary
      id={id}
      videoListType={videoListType}
      pressed={handleVideoSelect}
    >
      <div className="img-wrapper">
        <img src={url} alt={title} />
      </div>
      <div className="secondary-card-text">
        <div className="description-brief">
          <h5>
            <span className="description-title">{title}</span>
          </h5>
        </div>
        <div className="card-footer">
          <p>{date}</p>
          <div
            onClick={() => {
              console.log("YO YO YO id " + id);
              console.log("YI YI YI videListType " + videoListType);
              console.log("YA YA YA videoListState " + videoListState);
              toggleFavorite(id, videoListType, videoListState);
            }}
            className="button-heart"
          >
            {favorite && <FontAwesomeIcon className="heart" icon={faHeart} />}
            {!favorite && <FontAwesomeIcon className="heart" icon={farHeart} />}
          </div>
        </div>
      </div>
    </CardSecondary>
  );
};

export default VideoItem;
//  <FontAwesomeIcon className="heart" icon={faHeart} />
/*
const VideoItem = ({
  id,
  title,
  handleVideoSelect,
  description,
  url,
  date,
}) => {
  return (
    <div id={id} onClick={() => handleVideoSelect(id)}>
      <img src={url} alt={title} />
      <h5>{title}</h5>
      <p>{date}</p>
      <p>{url}</p>
    </div>
  );
};

export default VideoItem;

*/
