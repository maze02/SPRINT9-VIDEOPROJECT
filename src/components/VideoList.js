import VideoItem from "./VideoItem";
import moment from "moment";
import { useContext, useEffect } from "react";
import { FavoritesContext } from "./store/FavoritesCtx";

const VideoList = ({
  loadVideos,
  handleVideoSelect,
  vidListTerm,
  videoListType,
}) => {
  const { favorites } = useContext(FavoritesContext);
  let videoListShow = null;
  let favoritesArr = [];
  let favoritesL = localStorage.getItem("favorites");
  if (favoritesL) {
    //checking video is in favorites
    favoritesArr = JSON.parse(favoritesL);
  }

  try {
    useEffect(() => {}, [favorites]);
    let videoListArr = JSON.parse(localStorage.getItem(vidListTerm));
    let favoriteStatus = false;
    const favoriteCheck = (id, favoritesLP, favoritesArrP) => {
      let favoriteStatus = false;
      if (favoritesLP) {
        //checking video is in favorites
        const isFavorites = (element) => element.localeCompare(id) === 0;
        const res = favoritesArrP.findIndex(isFavorites);
        favoriteStatus = res !== -1 ? true : false;
      }
      return favoriteStatus;
    };

    for (let i = 0; i < videoListArr.length; i++) {
      if (videoListArr[i].favoriteStatus === undefined) {
        console.log("I'm a penguin");
        let resFav = favoriteCheck(
          videoListArr[i].id.videoId,
          favoritesL,
          favoritesArr
        );
        videoListArr[i].favoriteStatus = resFav;
        console.log(
          "video id =" +
            videoListArr[i].id.videoId +
            ", favorite status =" +
            videoListArr[i].favoriteStatus
        );
      }
    }
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
          favorite={e.favoriteStatus}
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
