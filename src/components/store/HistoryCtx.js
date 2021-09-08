import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { VideoDetailContext } from "./VideoDetailCtx";
import { VideoSearchContext } from "./VideoSearchCtx";

const HistoryProvider = (props) => {
  const {
    videos,
    searchTerm,
    setVideos,
    setSearchItem,
    setSelectedVideo,
    selectedVideo,
  } = useContext(VideoSearchContext);
  const { handleVideoSelect } = useContext(VideoDetailContext);
  let selHistoryL = localStorage.getItem("selectedHistory");
  let selHistoryArr = selHistoryL ? JSON.parse(selHistoryL) : [];
  const [selectedHistory, setSelectedHistory] = useState(selHistoryArr);
  const history = useHistory();
  const handleViewHistory = (termP) => {
    //1 set searh item
    setSearchItem((prev) => termP);
    localStorage.setItem("searchItem", termP);

    //2 set videos
    let recommendedArr = JSON.parse(localStorage.getItem(termP));
    setVideos((previousVideos) => recommendedArr);
    history.push(`/home/${termP}`);
  };

  return (
    <HistoryContext.Provider
      value={{
        selectedHistory: selectedHistory,
        handleViewHistory: handleViewHistory,
      }}
    >
      {props.children}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;

export const HistoryContext = createContext();
