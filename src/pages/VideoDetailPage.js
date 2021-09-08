import { Fragment, useContext } from "react";
import { VideoSearchContext } from "../components/store/VideoSearchCtx";
import { VideoDetailContext } from "../components/store/VideoDetailCtx";
//COMPONENT IMPORTS
import SearchBar from "../components/SearchBar";
import VideoDetail from "../components/VideoDetail";
import VideoList from "../components/VideoList";

const VideoDetailPage = () => {
  const { searchRef, handleSubmit } = useContext(VideoSearchContext);
  const { loadRelVideos, handleVideoSelect, videoDetailErr, relatedVideos } =
    useContext(VideoDetailContext);
  return (
    <Fragment>
      <section className="section-searchbar-wrapper">
        <div className="border">
          <SearchBar searchRef={searchRef} handleSubmit={handleSubmit} />
        </div>
      </section>
      <h1 className="heading3">Video Detail</h1>
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
