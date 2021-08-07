const VideoItem = ({
  id,
  title,
  handleVideoSelect,
  description,
  url,
  date,
}) => {
  return (
    <div onClick={() => handleVideoSelect(id)}>
      <img src={url} alt={title} />
      <h5>{title}</h5>
      <p>{date}</p>
      <p>{url}</p>
    </div>
  );
};

export default VideoItem;
