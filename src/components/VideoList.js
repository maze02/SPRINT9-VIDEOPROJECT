import VideoItem from "./VideoItem";
import FavoritesItem from "./FavoritesItem";
import moment from "moment";
import { Fragment, useContext, useEffect } from "react";
import { FavoritesContext } from "./store/FavoritesCtx";
import { HorizontalSliderContext } from "./store/HorizontalSliderCtx";

const VideoList = ({
  loadVideos,
  handleVideoSelect,
  vidListTerm,
  videoListType,
  videoListState,
}) => {
  const { favorites } = useContext(FavoritesContext);
  const {
    pressed,
    outerslider,
    innerslider,
    mouseDownSlider,
    handleMouseMove,
  } = useContext(HorizontalSliderContext);
  let videoListShow = null;
  let favoritesArr = [];
  let favoritesL = localStorage.getItem("favorites");
  let videoListArr = JSON.parse(localStorage.getItem(vidListTerm));
  if (favoritesL) {
    //checking video is in favorites
    favoritesArr = JSON.parse(favoritesL);
  }

  try {
    //useEffect(() => {}, [favorites]);
    videoListArr = JSON.parse(localStorage.getItem(vidListTerm));
    let favoriteStatus = false;

    const favoriteCheck = (id, favoritesLP, favoritesArrP) => {
      let favoriteStatus = false;
      if (favoritesLP) {
        //checking video is in favorites
        const isFavorites = (element) =>
          element.id.videoId.localeCompare(id) === 0;
        const res = favoritesArrP.findIndex(isFavorites);
        favoriteStatus = res !== -1 ? true : false;
      }
      return favoriteStatus;
    };
    if (videoListArr) {
      for (let i = 0; i < videoListArr.length; i++) {
        if (videoListArr[i].snippet === undefined) {
          videoListArr.splice(i, 1);
        }
      }
      for (let i = 0; i < videoListArr.length; i++) {
        if (videoListArr[i].favoriteStatus === undefined) {
          //video check run here
          let resFav = favoriteCheck(
            videoListArr[i].id.videoId,
            favoritesL,
            favoritesArr
          );
          videoListArr[i].favoriteStatus = resFav;
        }
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
          videoListState={videoListState}
          videoListType={videoListType}
          handleVideoSelect={handleVideoSelect}
          favorite={e.favoriteStatus}
        />
      );
    });
  } catch (error) {
    console.log(error);
  }
  //handling favorites
  if (videoListType === "favorites" && favoritesL) {
    videoListShow = videoListArr.map((e, index) => {
      return (
        <FavoritesItem
          key={index}
          id={e.id.videoId}
          title={e.snippet.title}
          description={e.snippet.description}
          url={e.snippet.thumbnails.medium.url}
          date={moment(
            e.snippet.publishTime.substring(0, 10).replace(/-/g, ""),
            "YYYYMMDD"
          ).fromNow()}
          videoListState={videoListState}
          videoListType={videoListType}
          handleVideoSelect={handleVideoSelect}
          favorite={e.favoriteStatus}
        />
      );
    });
    //returning unstyled favorites list in videoListShow
    return (
      <Fragment>
        {loadVideos && videoListShow !== null && videoListShow}
      </Fragment>
    );
  } else {
    loadVideos = false;
  }
  return (
    <div>
      {!loadVideos && videoListShow !== null && (
        <div className="outer-slider">
          <div className="inner-slider">{videoListShow}</div>
        </div>
      )}
      {loadVideos && <p>Loading videoList...</p>}
      {!loadVideos &&
        videoListShow === null &&
        videoListType === "favorites" && (
          <p className="text-center">
            No Favorites added yet. Click on the heart icon of the videos to
            add.
          </p>
        )}
    </div>
  );
};
export default VideoList;

/*
ref={outerslider}
 ref={innerslider}
        onMouseDown={(e) => {
          mouseDownSlider(e, innerslider);
        }}
        onMouseMove={(e) => {
          handleMouseMove(e, innerslider);
        }}
*/
