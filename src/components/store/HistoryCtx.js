import { createContext, useContext, useState, useEffect } from "react";
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

  const handleViewHistory = (termP) => {
    //1 set searh item
    setSearchItem((prev) => termP);
    localStorage.setItem("searchItem", searchTerm);

    //2 set videos
    let recommendedArr = JSON.parse(localStorage.getItem(termP));

    setVideos((previousVideos) => recommendedArr);
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

/*    let hisViewStr = localStorage.getItem(termP);
    let hisViewArr = hisViewStr ? JSON.parse(hisViewStr) : [];
    setSelectedHistory((prev) => hisViewArr);
    localStorage.setItem("seletedHistory", hisViewStr);
    handleVideoSelect(hisViewArr[0].id.videoId, "selectedHistory");
    setSelectedVideo((prev) => hisViewArr[0]);
    localStorage.setItem("selectedVideo", JSON.stringify(hisViewArr[0]));
    */
