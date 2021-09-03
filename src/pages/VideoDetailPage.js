import { Fragment, useContext } from "react";
import { VideoSearchContext } from "../components/store/VideoSearchCtx";
import { VideoDetailContext } from "../components/store/VideoDetailCtx";
//COMPONENT IMPORTS
import SearchBar from "../components/SearchBar";
import VideoDetail from "../components/VideoDetail";
import VideoList from "../components/VideoList";

const VideoDetailPage = () => {
  const { loadRelVideos, handleVideoSelect, videoDetailErr, relatedVideos } =
    useContext(VideoDetailContext);

  return (
    <Fragment>
      <h1>VideoDetail</h1>
      <section className="section-searchbar-wrapper">
        <div className="border">
          <h1 className="heading1">Video Search </h1>
          <SearchBar />
        </div>
      </section>

      {videoDetailErr.status && (
        <h2 className="text-center">Error. Please try again later.</h2>
      )}
      {!videoDetailErr.status && (
        <Fragment>
          <VideoDetail />
          <h2 className="heading2">Related Videos</h2>
          <section className="section-video-wrapper">
            <VideoList
              loadVideos={loadRelVideos}
              handleVideoSelect={handleVideoSelect}
              vidListTerm="relatedVideos"
              videoListType="relatedVideos"
              videoListState={relatedVideos}
            />
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default VideoDetailPage;
