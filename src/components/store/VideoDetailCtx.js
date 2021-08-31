import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { VideoSearchContext } from "./VideoSearchCtx";

// /videodetail/:videoId
const VideoDetailProvider = (props) => {
  let lastViewedL = localStorage.getItem("lastViewed");
  let lastViewedArr = lastViewedL ? JSON.parse(lastViewedL) : [];

  const [lastViewed, setLastViewed] = useState(lastViewedArr);
  // let relaVid = localStorage.getItem("relatedVideos")
  // ? JSON.parse(localStorage.getItem("relatedVideos"))
  //   : [];
  const { videos, selectId, searchItem, setSelectId, setSelectedVideo } =
    useContext(VideoSearchContext);
  //let selectIdL = localStorage.getItem("selectId");
  //let selectIdL = selectId ? localStorage.getItem("selectId") : selectId;
  //console.log("0000-SELECTIDL= " + selectIdL);
  console.log("0000-selectId =" + selectId);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loadRelVideos, setLoadRelVideos] = useState(true);
  const [nextRelPageToken, setRelNextPageToken] = useState("");
  console.log("111111111111-SETTING REFRESHDETAILPAGE-> TRUE");
  const [refreshDetailPg, setRefreshDetailPg] = useState(true);
  const [videoDetailErr, setVideoDetailErr] = useState({
    status: false,
    errLog: [],
  });
  const history = useHistory();
  const [refreshFlag, setRefreshFlag] = useState(false);

  //refresh checkpoint
  useEffect(() => {
    if (refreshDetailPg) {
      console.log("9999-detailREFRESHCHECKPOINT");
      console.log("selectId status" + selectId);
      if (selectId) {
        setRefreshDetailPg((prev) => false);
        console.log("555555-SETTING REFRESHDETAILPAGE-> FALSE");
      }
    }
  }, [selectId]);

  const handleVideoSelect = (id, videoListType) => {
    setRefreshDetailPg((prev) => false); //not refreshing, clicking

    localStorage.setItem("refreshDetailPg", "false");
    setSelectId((prev) => id);
    localStorage.setItem("selectId", JSON.stringify(id));
    let videoListStr = localStorage.getItem(videoListType);
    //handling page being refreshed
    let vidId = localStorage.getItem("selectId");
    let videoListP = videoListStr ? JSON.parse(videoListStr) : [];
    let selectItem = null;

    for (let i = 0; i < videoListP.length; i++) {
      if (id.localeCompare(videoListP[i].id.videoId) === 0) {
        selectItem = videoListP[i];
        setSelectedVideo((prev) => selectItem);
        localStorage.setItem("selectedVideo", JSON.stringify(selectItem));
        lastViewedArr.unshift(selectItem);
        localStorage.setItem("lastViewed", JSON.stringify(lastViewedArr));
        setLastViewed((prev) => lastViewedArr);
      }
    }
    getRelVideos(id);
    history.push(`/videodetail/${id}`);
    console.log("AAAAA-vidId " + vidId);
  };
  /*
  const handleVideoSelect = (id) => {
    setRefreshDetailPg((prev) => false); //not refreshing, clicking
    localStorage.setItem("refreshDetailPg", "false");
    setSelectId((prev) => id);
    localStorage.setItem("selectId", JSON.stringify(id));
    //handling page being refreshed
    let vidId = localStorage.getItem("selectId");
    let selectItem = null;
    for (let i = 0; i < videos.length; i++) {
      if (id.localeCompare(videos[i].id.videoId) === 0) {
        selectItem = videos[i];
        setSelectedVideo((prev) => selectItem);
        localStorage.setItem("selectedVideo", JSON.stringify(selectItem));
      }
    }
    getRelVideos(id);
    history.push(`/videodetail/${id}`);
    console.log("AAAAA-vidId " + vidId);
  };
  */
  /*
    console.log("SSSSSSSSSSS-inHANDLEVIDEOSELECT");
    console.log("111111111111-SETTING REFRESHDETAILPAGE-> FALSE");
*/
  const getRelVideos = async (videoId) => {
    console.log("222222- refreshDetailpg Status " + refreshDetailPg);
    let apiKey4 = `${process.env.REACT_APP_ACCESS_KEY1}`;
    let apiKey = `${process.env.REACT_APP_ACCESS_KEY2}`;
    let apiKey2 = `AIzaSyBNV1xLcc3zEuseiBN2ZNiDEIe3WpUM_RM`;
    let apiKey0 = `AIzaSyBQu_RLMTu-Fd9s-dTMNZcbRI04rbcM8zs`;

    try {
      let res = nextRelPageToken
        ? await axios.get("https://youtube.googleapis.com/youtube/v3/search?", {
            params: {
              part: "snippet",
              type: "video",
              pageToken: nextRelPageToken,
              key: apiKey,
              relatedToVideoId: videoId,
            },
          })
        : await axios.get("https://youtube.googleapis.com/youtube/v3/search?", {
            params: {
              part: "snippet",
              type: "video",
              key: apiKey,
              relatedToVideoId: videoId,
            },
          });
      await console.log(res.data.items);
      if (refreshDetailPg === false) {
        if (
          relatedVideos.length === 0 ||
          selectId.localeCompare(
            JSON.parse(localStorage.getItem("selectId"))
          ) !== 0
        ) {
          console.log("77777-refreshDetailPg status : " + refreshDetailPg);
          console.log("7777-CHANGING RELATED VIDEOS IN LOCAL");
          //console.log("7777-selectIdL = " + selectIdL);
          await localStorage.setItem(
            "relatedVideos",
            JSON.stringify(res.data.items)
          );
          await setRelatedVideos((previousVideos) => {
            return res.data.items;
          });
        } else {
          console.log("81818181-CHANGING RELATED VIDEOS IN LOCAL");
          await localStorage.setItem(
            "relatedVideos",
            JSON.stringify([...relatedVideos, ...res.data.items])
          );
          await setRelatedVideos((previousVideos) => {
            return [...previousVideos, ...res.data.items];
          });
        }
        setVideoDetailErr((prev) => {
          return {
            status: false,
            errLog: [...videoDetailErr.errLog],
          };
        });
        await localStorage.setItem("nextRelPageToken", res.data.nextPageToken);
      }
      await setLoadRelVideos((prev) => false);
    } catch (error) {
      setLoadRelVideos((prev) => false);
      console.log(error.message);
      console.log(error.statusCode);
      setVideoDetailErr((prev) => {
        return {
          status: true,
          errLog: [...videoDetailErr.errLog, { error }],
        };
      });
    }
  };
  //for default load and for api pagination
  useEffect(() => {
    getRelVideos();
  }, [nextRelPageToken]); //nextPageToken

  return (
    <VideoDetailContext.Provider
      value={{
        refreshFlag,
        refreshDetailPg,
        loadRelVideos,
        lastViewed: lastViewed,
        videoDetailErr: videoDetailErr,
        relatedVideos: relatedVideos,
        setRefreshFlag: setRefreshFlag,
        handleVideoSelect: handleVideoSelect,
      }}
    >
      {props.children}
    </VideoDetailContext.Provider>
  );
};

export default VideoDetailProvider;
export const VideoDetailContext = createContext();
