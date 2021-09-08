import { Fragment, useContext } from "react";

//CONTEXT IMPORTS
import { VideoSearchContext } from "../components/store/VideoSearchCtx";
import { VideoDetailContext } from "../components/store/VideoDetailCtx";
import { FavoritesContext } from "../components/store/FavoritesCtx";

//COMPONENT IMPORTS
import CondensedHistoryList from "../components/CondensedHistoryList";
import SearchBar from "../components/SearchBar";
import VideoList from "../components/VideoList";

const MainPage = () => {
  const {
    videos,
    loadVideos,
    searchRef,
    handleSubmit,
    videoSearchErr,
    searchItem,
  } = useContext(VideoSearchContext);
  const { favorites } = useContext(FavoritesContext);
  const { handleVideoSelect } = useContext(VideoDetailContext);

  let vidListTerm = searchItem ? searchItem : "penguins";
  let loadVideosL = loadVideos;

  return (
    <Fragment>
      <section className="section-searchbar-wrapper">
        <div className="border">
          <SearchBar searchRef={searchRef} handleSubmit={handleSubmit} />
        </div>
      </section>
      {videoSearchErr.status && (
        <h3 className="text-center">Error. Please try again later.</h3>
      )}

      {!videoSearchErr.status && (
        <section className="section-video-wrapper">
          <h2 className="heading4">Recommended Videos</h2>
          <VideoList
            loadVideos={loadVideosL}
            handleVideoSelect={handleVideoSelect}
            vidListTerm={vidListTerm}
            videoListType="videos"
            videoListState={videos}
          />
        </section>
      )}

      <div className="main-history-favorites-wrapper">
        <section className="last-searches-wrapper">
          <h2 className="heading3">Last searches</h2>
          <div className="history-list">
            <div className="history-list-wrapper">
              <CondensedHistoryList />
            </div>
          </div>
        </section>
        <section className="fav-wrapper">
          <h2 className="heading3">
            Favorites videos &#183; {favorites.length}
          </h2>
          <div
            className={
              favorites.length > 0
                ? "favorites-main-view"
                : "comment-favpage-view"
            }
          >
            <div className="fav-wrapper-2">
              <VideoList
                loadVideos={false}
                handleVideoSelect={handleVideoSelect}
                vidListTerm="favorites"
                videoListType="favorites"
                videoListState={favorites}
              />
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default MainPage;
