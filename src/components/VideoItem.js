import CardSecondary from "./UI/Card";

const VideoItem = ({
  id,
  title,
  handleVideoSelect,
  description,
  url,
  date,
}) => {
  return (
    <CardSecondary id={id} pressed={handleVideoSelect}>
      <img src={url} alt={title} />
      <div className="description-brief">
        <h5>{title}</h5>
      </div>
    </CardSecondary>
  );
};

export default VideoItem;

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
