import CondensedHistoryItem from "./CondensedHistoryItem";
import moment from "moment";

const CondensedHistoryList = () => {
  let videoListShow = null;
  try {
    let videoListArr = JSON.parse(localStorage.getItem("historyVideos"));
    if (videoListArr) {
      videoListShow = videoListArr.map((e, index) => {
        return (
          <CondensedHistoryItem
            key={index}
            searchTerm={e.searchTermH}
            url={e.historyVidList[0].snippet.thumbnails.default.url}
            date={e.date}
          />
        );
      });
    } else {
      <h2>No videos searched yet</h2>;
    }
  } catch (err) {
    console.log(err);
  }
  return <div>{videoListShow}</div>;
};

export default CondensedHistoryList;
/*
  url={e.historyVidList}
{    
  handleViewHistory,
  vidListTerm,
  videoListType,
} */
