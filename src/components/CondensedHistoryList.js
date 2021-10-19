import CondensedHistoryItem from "./CondensedHistoryItem";
import moment from "moment";

const CondensedHistoryList = () => {
  let videoListShow = null;

  try {
    let videoListArr = JSON.parse(localStorage.getItem("historyVideos"));
    if (!videoListArr || (videoListArr && videoListArr.length <= 2)) {
      videoListShow = (
        <p className="text-center">
          Why not search for something that tickles your curiosity?
        </p>
      );
    }
    if (videoListArr && videoListArr.length > 2) {
      //removing first item that is placed when loaded for refresh comparison in videoSearchCtx so searchTerm is not undefined in videoSearchCtx
      if (
        videoListArr[videoListArr.length - 1].searchTermH.localeCompare(
          "1919"
        ) === 0
      ) {
        videoListArr.pop();
        videoListArr.pop();
      }
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
    }
  } catch (err) {
    console.log(err);
  }
  return <>{videoListShow}</>;
};

export default CondensedHistoryList;
