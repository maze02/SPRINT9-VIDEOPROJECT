import { Fragment, useContext } from "react";
import CondensedHistoryList from "../components/CondensedHistoryList";
import { VideoSearchContext } from "../components/store/VideoSearchCtx";
import { VideoDetailContext } from "../components/store/VideoDetailCtx";
import { HistoryContext } from "../components/store/HistoryCtx";
import SearchBar from "../components/SearchBar";

//COMPONENT IMPORTS
import VideoDetail from "../components/VideoDetail";
import VideoList from "../components/VideoList";
const HistoryPage = () => {
  const { lastViewed, handleVideoSelect } = useContext(VideoDetailContext);
  const { historyMix, historyVideos, searchRef, handleSubmit } =
    useContext(VideoSearchContext);
  return (
    <div className="page-container">
      <section className="section-searchbar-wrapper">
        <div className="border">
          <SearchBar searchRef={searchRef} handleSubmit={handleSubmit} />
        </div>
      </section>
      <h1>History</h1>
      <h2>Last viewed</h2>
      {lastViewed && lastViewed.length !== 0 && (
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
      {lastViewed.length === 0 && (
        <p className="text-center">
          Not viewed any videos yet. Why not watch a video?
        </p>
      )}
      <h2>Searches Video Mix &#183; Two videos per search term</h2>
      {historyMix && historyMix.length !== 0 && (
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
      {historyMix && historyMix.length === 0 && (
        <p className="text-center">
          Not searched any videos yet. Search for something that tickles your
          curiosity!
        </p>
      )}
      <h2>Terms Searched</h2>
      <CondensedHistoryList />
    </div>
  );
};

export default HistoryPage;
