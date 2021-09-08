import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { VideoSearchContext } from "./VideoSearchCtx";

const VideoDetailProvider = (props) => {
  const { selectId, setSelectId, setSelectedVideo } =
    useContext(VideoSearchContext);
  let lastViewedL = localStorage.getItem("lastViewed");
  let lastViewedArr = lastViewedL ? JSON.parse(lastViewedL) : [];
  const [lastViewed, setLastViewed] = useState(lastViewedArr);

  let relaVidArr = localStorage.getItem("relatedVideos")
    ? JSON.parse(localStorage.getItem("relatedVideos"))
    : [];

  const [relatedVideos, setRelatedVideos] = useState(relaVidArr);
  const [loadRelVideos, setLoadRelVideos] = useState(true);
  const [nextRelPageToken, setRelNextPageToken] = useState("");
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
      if (selectId) {
        setRefreshDetailPg((prev) => false);
      }
    }
  }, [selectId]);

  const handleVideoSelect = (id, videoListType) => {
    setRefreshDetailPg((prev) => false); //not refreshing, clicking

    localStorage.setItem("refreshDetailPg", "false");
    setSelectId((prev) => id);
    localStorage.setItem("selectId", JSON.stringify(id));

    //handling page being refreshed
    let vidId = localStorage.getItem("selectId");
    let videoListP = localStorage.getItem(videoListType)
      ? JSON.parse(localStorage.getItem(videoListType))
      : [];
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
  };

  const getRelVideos = async (videoId) => {
    console.log("222222- refreshDetailpg Status " + refreshDetailPg);
    let apiKey2 = `${process.env.REACT_APP_ACCESS_KEY1}`;
    let apiKey = `${process.env.REACT_APP_ACCESS_KEY2}`;
    let apiKey0 = `AIzaSyBNV1xLcc3zEuseiBN2ZNiDEIe3WpUM_RM`;
    let apiKey4 = `AIzaSyBQu_RLMTu-Fd9s-dTMNZcbRI04rbcM8zs`;

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

      if (refreshDetailPg === false) {
        if (
          relatedVideos.length === 0 ||
          selectId.localeCompare(
            JSON.parse(localStorage.getItem("selectId"))
          ) !== 0
        ) {
          await localStorage.setItem(
            "relatedVideos",
            JSON.stringify(res.data.items)
          );
          await setRelatedVideos((previousVideos) => {
            return res.data.items;
          });
        } else {
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
