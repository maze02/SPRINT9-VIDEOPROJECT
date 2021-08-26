import CardSecondary from "./UI/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
const VideoItem = ({
  id,
  title,
  handleVideoSelect,
  description,
  videoListType,
  url,
  date,
}) => {
  return (
    <CardSecondary
      id={id}
      videoListType={videoListType}
      pressed={handleVideoSelect}
    >
      <div>
        <img src={url} alt={title} />
      </div>
      <div className="secondary-card-text">
        {" "}
        <div className="description-brief">
          <h5>{title.substring(0, 21)}...</h5>
        </div>
        <div className="card-footer">
          <p>{date}</p>

          <FontAwesomeIcon className="heart" icon={farHeart} />
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
