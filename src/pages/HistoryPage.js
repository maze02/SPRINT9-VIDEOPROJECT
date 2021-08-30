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
  const { lastViewed, historyMix, handleVideoSelect } =
    useContext(VideoDetailContext);

  return (
    <div className="page-container">
      <h1>History</h1>
      <h2>Last viewed</h2>
      {lastViewed && (
        <section>
          <VideoList
            loadVideos={false}
            handleVideoSelect={handleVideoSelect}
            vidListTerm="lastViewed"
            videoListType="lastViewed"
            vidListState={lastViewed}
          />
        </section>
      )}
      {!lastViewed && (
        <p>Not viewed any videos yet. Click on one to see one in detail.</p>
      )}
      <h2>Searches Video Mix &#183; Two videos per search term</h2>
      {lastViewed && (
        <section>
          <VideoList
            loadVideos={false}
            handleVideoSelect={handleVideoSelect}
            vidListTerm="historyMix"
            videoListType="historyMix"
            vidListState={historyMix}
          />
        </section>
      )}
      {!lastViewed && (
        <p>Not searched any videos yet. Click on one to see one in detail.</p>
      )}
      <h2>Terms Searched</h2>
      <CondensedHistoryList />
    </div>
  );
};

export default HistoryPage;
