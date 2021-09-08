import CardSecondary from "./UI/Card";
import { useContext } from "react";
import { FavoritesContext } from "./store/FavoritesCtx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
const VideoItem = ({
  id,
  title,
  handleVideoSelect,
  videoListState,
  videoListType,
  url,
  date,
  favorite,
}) => {
  const { toggleFavorite } = useContext(FavoritesContext);

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
