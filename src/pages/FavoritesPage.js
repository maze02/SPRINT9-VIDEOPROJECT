import { Fragment, useContext } from "react";
import FavoritesItem from "../components/FavoritesItem";
import VideoList from "../components/VideoList";
import { VideoSearchContext } from "../components/store/VideoSearchCtx";
import { FavoritesContext } from "../components/store/FavoritesCtx";

const FavoritesPage = () => {
  const { handleVideoSelect } = useContext(VideoSearchContext);
  const { favorites } = useContext(FavoritesContext);
  return (
    <Fragment>
      <h1>FavoritesPage</h1>
      <VideoList
        loadVideos={true}
        handleVideoSelect={handleVideoSelect}
        vidListTerm="favorites"
        videoListType="favorites"
        videoListState={favorites}
      />
      <FavoritesItem />
    </Fragment>
  );
};

export default FavoritesPage;
