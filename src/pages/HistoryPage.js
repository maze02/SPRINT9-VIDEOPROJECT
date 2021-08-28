import { Fragment, useContext } from "react";
import CondensedHistoryList from "../components/CondensedHistoryList";
import { VideoSearchContext } from "../components/store/VideoSearchCtx";
import { VideoDetailContext } from "../components/store/VideoDetailCtx";
import { HistoryContext } from "../components/store/HistoryCtx";

//COMPONENT IMPORTS
import VideoDetail from "../components/VideoDetail";
import VideoList from "../components/VideoList";
const HistoryPage = () => {
  const { selectedHistory } = useContext(HistoryContext);
  const { handleVideoSelect } = useContext(VideoDetailContext);
  return (
    <Fragment>
      <h1>List of videos for last search: "{selectedHistory}"</h1>
      {
        <section className="section-video-wrapper">
          <VideoList
            loadVideos={false}
            handleVideoSelect={handleVideoSelect}
            vidListTerm={selectedHistory}
            videoListType={selectedHistory}
          />
        </section>
      }
      ;
    </Fragment>
  );
};

export default HistoryPage;
