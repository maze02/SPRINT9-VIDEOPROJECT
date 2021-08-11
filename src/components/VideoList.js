import VideoItem from "./VideoItem";

const VideoList = ({ searchRef, loadVideos, handleVideoSelect }) => {
  let videoListShow = null;
  try {
    if (searchRef.current.value !== null) {
      let searchStr = searchRef.current.value
        ? searchRef.current.value
        : "penguins";
      let videoListArr = JSON.parse(localStorage.getItem(searchStr));
      videoListShow = videoListArr.map((e, index) => {
        return (
          <VideoItem
            key={index}
            id={e.id.videoId}
            title={e.snippet.title}
            description={e.snippet.description}
            url={e.snippet.thumbnails.medium.url}
            date={e.snippet.publishTime}
            handleVideoSelect={handleVideoSelect}
          />
        );
      });
    }
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="videolist-wrapper">
      {loadVideos && <p>Loading videoList...</p>}
      {!loadVideos && videoListShow !== null && videoListShow}
    </div>
  );
};

export default VideoList;

/*      <h3 className="heading3">Related Videos</h3>*/
