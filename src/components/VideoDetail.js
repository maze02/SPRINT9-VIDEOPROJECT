import { Fragment, useContext } from "react";
import { VideoSearchContext } from "./store/VideoSearchCtx";
import { VideoDetailContext } from "./store/VideoDetailCtx";
import { useLocation } from "react-router";
const VideoDetail = () => {
  const { loadVideos, selectId, selectedVideo } =
    useContext(VideoSearchContext);

  const { refreshFlag, setRefreshFlag } = useContext(VideoDetailContext);

  const location = useLocation();
  //handle refreshing browser
  let localId = JSON.parse(localStorage.getItem("selectId"));
  let browserParamId = location.pathname.substring(13);
  console.log("browserParamId " + browserParamId);

  let url = null;
  let title = null;
  let date = null;
  let selectedVid = null;
  let selectIdDetail = browserParamId;
  if (localId == browserParamId && selectId !== browserParamId) {
    setRefreshFlag((prev) => true);
  }

  if (!loadVideos) {
    selectedVid = JSON.parse(localStorage.getItem("selectedVideo"));
    selectIdDetail = selectedVid.id.videoId;
  }

  return (
    <article className="video-detail-component">
      {!loadVideos && (
        <div className="videodetail-card">
          <div className="video-thumbnail">
            <iframe
              src={`https://www.youtube.com/embed/${selectIdDetail}?controls=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="description">
            <h5>{selectedVid.snippet.title}</h5>
            <p>{selectedVid.snippet.description}</p>
          </div>
        </div>
      )}
      {loadVideos && <p>video loading</p>}
    </article>
  );
};

export default VideoDetail;
