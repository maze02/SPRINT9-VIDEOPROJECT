import { useContext } from "react";
import VideoList from "../components/VideoList";
import { VideoSearchContext } from "../components/store/VideoSearchCtx";
import { FavoritesContext } from "../components/store/FavoritesCtx";

const FavoritesPage = () => {
  const { handleVideoSelect } = useContext(VideoSearchContext);
  const { favorites } = useContext(FavoritesContext);
  return (
    <div className="page-container">
      <h1>Favorites</h1>
      <div className="favorites-favpage-view">
        <VideoList
          loadVideos={true}
          handleVideoSelect={handleVideoSelect}
          vidListTerm="favorites"
          videoListType="favorites"
          videoListState={favorites}
        />
      </div>
    </div>
  );
};

export default FavoritesPage;
