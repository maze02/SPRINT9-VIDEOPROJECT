import { createContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

const FavoritesProvider = (props) => {
  let favoritesL = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [];

  const [favorites, setFavorites] = useState(favoritesL);

  const history = useHistory();

  const toggleFavorite = (videoId) => {
    console.log("WOOOO-inside toggler");
    let favoritesL = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : null;

    //if favorites exist - might be adding or removing it from favs
    if (favoritesL) {
      //checking video is in favorites
      const res = favoritesL.findIndex(
        (element) => element.localeCompare(videoId) === 0
      );
      if (res !== -1) {
        //if it is, remove from favs
        favoritesL.splice(res, 1);
        setFavorites((prev) => favoritesL);
        localStorage.setItem("favorites", JSON.stringify(favoritesL));
      } else {
        //if it isn't, add to favorites
        favoritesL.push(videoId);
        setFavorites((prev) => favoritesL);
        localStorage.setItem("favorites", JSON.stringify(favoritesL));
      }
    } else {
      //if favorites not exist - adding to favs
      setFavorites([videoId]);
      localStorage.setItem("favorites", JSON.stringify([videoId]));
    }
  };

  /*
  //check if favorites is true & only if true, run check
  if (favoritesL) {
    //checking video is in favorites
    const favoritesArr = JSON.parse(favoritesL);
    const isFavorites = (element) => element.localeCompare(id);
    const res = favoritesArr.findIndex(isFavorites);
    if (res !== -1) {
      //only if video is favorites, render heartContent as solid
      heartContent = <FontAwesomeIcon className="heart" icon={faHeart} />;
    }
  }
  */

  /*
  useEffect(
    ()=>{

    },[favorites]
  )
  */
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

/*
  const FavoriteAdd = (videoId) => {
    let favoritesL = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : null;

    if (favoritesL) {
      favoritesL.push(videoId);
      setFavorites((prev) => favoritesL);
      localStorage.setItem("favorites", JSON.stringify(favoritesL));
    } else {
      setFavorites([videoId]);
      localStorage.setItem("favorites", JSON.stringify([videoId]));
    }
  };

  const FavoriteRemove = (videoId) => {
    let favoritesL = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : null;

    if (favoritesL) {
      //checking video is in favorites
      const res = favoritesL.findIndexOf(
        (element) => element.localeCompare(videoId) === 0
      );
      if (res !== -1) {
        //if it is it's removed
        favoritesL.splice(res, 1);
        setFavorites((prev) => favoritesL);
        localStorage.setItem("favorites", JSON.stringify(favoritesL));
      }
    }
  };

*/
