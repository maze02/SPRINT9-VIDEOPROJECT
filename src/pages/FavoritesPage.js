import { useContext } from "react";
import VideoList from "../components/VideoList";
import styled from "styled-components";
import { FavoritesContext } from "../components/store/FavoritesCtx";
import { VideoDetailContext } from "../components/store/VideoDetailCtx";
import SearchBar from "../components/SearchBar";
import { VideoSearchContext } from "../components/store/VideoSearchCtx";

const FavoritesPage = () => {
  const { searchRef, handleSubmit } = useContext(VideoSearchContext);
  const { handleVideoSelect } = useContext(VideoDetailContext);
  const { favorites } = useContext(FavoritesContext);
  return (
    <div className="page-container">
      <section className="section-searchbar-wrapper">
        <div className="border">
          <SearchBar searchRef={searchRef} handleSubmit={handleSubmit} />
        </div>
      </section>
      <h1>Favorites</h1>
      <FavoritesFavPageView>
        <VideoList
          loadVideos={true}
          handleVideoSelect={handleVideoSelect}
          vidListTerm="favorites"
          videoListType="favorites"
          videoListState={favorites}
        />
      </FavoritesFavPageView>
    </div>
  );
};

const FavoritesFavPageView = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center !important;
  align-items: center;
  max-width: 40rem;
  gap: 1rem;
`;
export default FavoritesPage;
