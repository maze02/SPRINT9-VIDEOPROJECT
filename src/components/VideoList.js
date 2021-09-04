import VideoItem from "./VideoItem";
import FavoritesItem from "./FavoritesItem";
import moment from "moment";
import { Fragment, useContext, useEffect } from "react";
import { FavoritesContext } from "./store/FavoritesCtx";

const VideoList = ({
  loadVideos,
  handleVideoSelect,
  vidListTerm,
  videoListType,
  videoListState,
}) => {
  //variables
  const { favorites } = useContext(FavoritesContext);
  let videoListShow = null;
  let favoritesArr = [];
  let favoritesL = localStorage.getItem("favorites");
  let vidListTermL = localStorage.getItem(vidListTerm);
  let videoListArr = JSON.parse(localStorage.getItem(vidListTerm));
  console.log("OIOIOI -videoListState" + videoListState);
  console.log("AIII-videoListArr- " + videoListArr);
  console.log("UIUI-vidlistTerm -" + vidListTerm);
  console.log(
    "UKUK-vidlistTermL -loadVideos" + " " + loadVideos + " " + vidListTermL
  );
  console.log("FI FI FI-loadVideos-" + loadVideos);

  /*
  if (favoritesL) {
    //checking there are videos saved in favorites
    favoritesArr = JSON.parse(favoritesL);
  }
  */
  //helper function
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
  ///generating content starts here
  if (!loadVideos) {
    //logic 1. check based on correct variables input
    if (favoritesL) {
      //checking there are videos saved in favorites to obtain latest favoritesArr... could console here to see if length > 0
      favoritesArr = JSON.parse(favoritesL);
    }
    videoListArr = JSON.parse(localStorage.getItem(vidListTerm));
    if (videoListType !== "favorites") {
      try {
        let favoriteStatus = false;
        if (videoListArr) {
          for (let i = 0; i < videoListArr.length; i++) {
            if (videoListArr[i].snippet === undefined) {
              videoListArr.splice(i, 1);
            }
            /*
        if (videoListArr[i].id.videoId === undefined) {
          videoListArr.splice(i, 1);
        }
        */
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
        //2.generating content for a standard strip list based on correct var input
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
        //generating error if problem
        console.log(error);
      }
    }
    //3. generating a favorites list based on correct var input
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
    }
  }
  return (
    <Fragment>
      {loadVideos && <p>Loading videos...</p>}
      {!loadVideos &&
        videoListType !== "favorites" &&
        videoListShow !== null && (
          <div className="video-list-wrapper">{videoListShow}</div>
        )}
      {!loadVideos &&
        videoListType !== "favorites" &&
        (videoListShow === null || videoListShow.length < 1) && (
          <p className="text-center">
            No videos could be found relating to {vidListTerm}
          </p>
        )}
      {!loadVideos &&
        videoListType === "favorites" &&
        videoListShow !== null && <Fragment>{videoListShow}</Fragment>}
      {videoListType === "favorites" &&
        (videoListShow === null || videoListShow.length < 1) && (
          <p className="text-center">
            No Favorites added yet. Click on the heart icon of the videos to
            add.
          </p>
        )}
    </Fragment>
  );
};

export default VideoList;
