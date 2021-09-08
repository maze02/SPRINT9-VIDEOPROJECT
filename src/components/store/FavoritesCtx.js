import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

const FavoritesProvider = (props) => {
  let favoritesL = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [];

  const [favorites, setFavorites] = useState(favoritesL);

  const history = useHistory();

  const toggleFavorite = (videoId, videoListP, videoListState) => {
    let favoritesL = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : null; //changing value
    let videoListArr = videoListState
      ? videoListState
      : JSON.parse(localStorage.getItem(videoListP));
    //if favorites exist - might be adding or removing it from favs
    if (favoritesL) {
      //checking video is in favorites
      const res = favoritesL.findIndex(
        (element) => element.id.videoId.localeCompare(videoId) === 0
      );
      if (res !== -1) {
        //if it is, remove from favs
        favoritesL.splice(res, 1);
        setFavorites((prev) => favoritesL);
        localStorage.setItem("favorites", JSON.stringify(favoritesL));
      } else {
        //if it isn't, add to favorites
        //find index of item with id clicked on in the videoList in question//
        const j = videoListArr.findIndex(
          (element) => element.id.videoId.localeCompare(videoId) === 0
        );
        favoritesL.unshift(videoListArr[j]);
        setFavorites((prev) => favoritesL);
        localStorage.setItem("favorites", JSON.stringify(favoritesL));
      }
    } else {
      //if favorites not exist - adding to favs
      const j = videoListArr.findIndex(
        (element) => element.id.videoId.localeCompare(videoId) === 0
      );
      setFavorites((prev) => [videoListArr[j]]);
      localStorage.setItem("favorites", JSON.stringify([videoListArr[j]]));
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites: favorites,
        toggleFavorite: toggleFavorite,
      }}
    >
      {props.children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;

export const FavoritesContext = createContext();
