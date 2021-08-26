import VideoItem from "./VideoItem";
import moment from "moment";

const VideoList = ({
  loadVideos,
  handleVideoSelect,
  vidListTerm,
  videoListType,
}) => {
  let videoListShow = null;
  try {
    let videoListArr = JSON.parse(localStorage.getItem(vidListTerm));
    console.log("3333-IN VIDEOLIST GETTING ViDEOS FROM LOCAL");
    videoListShow = videoListArr.map((e, index) => {
      return (
        <VideoItem
          key={index}
          id={e.id.videoId}
          title={e.snippet.title}
          description={e.snippet.description}
          url={e.snippet.thumbnails.medium.url}
          date={moment(
            e.snippet.publishTime.substring(0, 10).replace(/-/g, ""),
            "YYYYMMDD"
          ).fromNow()}
          videoListType={videoListType}
          handleVideoSelect={handleVideoSelect}
        />
      );
    });
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
