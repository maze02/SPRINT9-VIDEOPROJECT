import { createContext, useState, useEffect, useRef, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";

//things learnt - do a clean check of each data item to use in the app, checking it contains all the data you'll be using because I have now found that many api data do not have all the info
const VideoSearchProvider = (props) => {
  let searchTerm = localStorage.getItem("searchItem")
    ? localStorage.getItem("searchItem")
    : "penguins";

  let videosL = localStorage.getItem("videos");
  let videosArr = videosL ? JSON.parse(videosL) : [];
  let historyVideosL = localStorage.getItem("historyVideos");
  let historyVideosArr = historyVideosL
    ? JSON.parse(historyVideosL)
    : [{ searchTermH: "1919", historyVidList: [] }];
  let historyMixL = localStorage.getItem("historyMix");
  let historyMixArr = historyMixL ? JSON.parse(historyMixL) : [];
  const history = useHistory();
  const location = useLocation();
  const [refreshMain, setRefreshMain] = useState(true);
  const searchRef = useRef();
  const buttonHeart = useRef("heart");
  const [searchItem, setSearchItem] = useState(searchTerm);

  const [videos, setVideos] = useState(videosArr);
  const [loadVideos, setLoadVideos] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectId, setSelectId] = useState("");
  const [nextPageToken, setNextPageToken] = useState("");
  const [videoSearchErr, setVideoSearchErr] = useState({
    status: false,
    errLog: [],
  });
  const [historyVideos, setHistoryVideos] = useState(historyVideosArr);
  const [historyMix, setHistoryMix] = useState(historyMixArr);
  const [loadSelVideo, setLoadSelVideo] = useState(false);
  const [selVidErr, setSelVidErr] = useState(false);

  const getVideos = async () => {
    console.log("2nd LOAD VIDEOS AFTER REFRESH CHECK");
    let apiKey2 = `${process.env.REACT_APP_ACCESS_KEY1}`;
    let apiKey = `${process.env.REACT_APP_ACCESS_KEY2}`;
    let apiKey0 = `AIzaSyBNV1xLcc3zEuseiBN2ZNiDEIe3WpUM_RM`;
    let apiKey4 = `AIzaSyBQu_RLMTu-Fd9s-dTMNZcbRI04rbcM8zs`;

    try {
      //getting videos as a result of submitting something in the search bar, therefore not as a result of refreshing.
      let searchTerm = localStorage.getItem("searchItem")
        ? localStorage.getItem("searchItem")
        : "penguins";
      history.push(`/home/${searchTerm}`);

      let res = nextPageToken
        ? await axios.get("https://youtube.googleapis.com/youtube/v3/search?", {
            params: {
              part: "snippet",
              maxResults: 25,
              pageToken: nextPageToken,
              q: searchTerm,
              key: apiKey,
              videoEmbeddable: "any",
            },
          })
        : await axios.get("https://youtube.googleapis.com/youtube/v3/search?", {
            params: {
              part: "snippet",
              maxResults: 25,
              q: searchTerm,
              key: apiKey,
              videoEmbeddable: "any",
            },
          });
      await console.log(searchTerm);
      await console.log(res.data.items);
      let dataList = [...res.data.items];
      checkDataHasId(dataList);
      //1st load scenario and new search term entered scenario
      if (
        videos.length === 0 ||
        searchTerm.localeCompare(
          JSON.parse(localStorage.getItem(searchItem))
        ) !== 0
      ) {
        await localStorage.setItem(searchTerm, JSON.stringify(dataList));
        await localStorage.setItem("videos", JSON.stringify(dataList));
        await setVideos((previousVideos) => {
          return dataList;
        });

        if (historyVideosArr[0].searchTermH.localeCompare(searchTerm) !== 0) {
          await historyVideosArr.unshift({
            searchTermH: searchTerm,
            historyVidList: dataList,
            date: moment().tz("Europe/Madrid").format(),
          });

          await localStorage.setItem(
            "historyVideos",
            JSON.stringify(historyVideosArr)
          );
          await setHistoryVideos((prevHistoryVideos) => historyVideosArr);

          await addToHistoryMix(historyVideosArr, historyMixArr, searchTerm);
        }
      } else {
        //Scenario that the new pagetoken is added but have the same searchtern
        await localStorage.setItem(
          searchTerm,
          JSON.stringify([...videos, ...dataList])
        );
        await localStorage.setItem(
          "videos",
          JSON.stringify([...videos, ...dataList])
        );
        await setVideos((previousVideos) => {
          return [...previousVideos, ...dataList];
        });
      }

      //setting the page token corresponding the current list downloaded
      await localStorage.setItem("nextPageToken", res.data.nextPageToken);
      //setting the searchItem to the current ref or "penguins" - refresh not considered here
      await setSearchItem((prev) => searchTerm);
      await localStorage.setItem("searchItem", searchTerm);
      await setSelectedVideo(
        (prev) => JSON.parse(localStorage.getItem(searchTerm))[0]
      );
      await setSelectId(
        (prev) => JSON.parse(localStorage.getItem(searchTerm))[0].id.videoId
      );
      await setLoadVideos((prev) => false);

      await setVideoSearchErr((prev) => {
        return {
          status: false,
          errLog: [...videoSearchErr.errLog],
        };
      });
      await localStorage.setItem(
        "videoSearchErr",
        JSON.stringify({
          status: false,
          errLog: [...videoSearchErr.errLog],
        })
      );
    } catch (error) {
      setLoadVideos((prev) => false);
      console.log("-searchctx -ERROR" + error);
      console.log(error.statusCode);
      setVideoSearchErr((prev) => {
        return {
          status: true,
          errLog: [...videoSearchErr.errLog, { error }],
        };
      });
      localStorage.setItem(
        "videoSearchErr",
        JSON.stringify({
          status: true,
          errLog: [...videoSearchErr.errLog, { error }],
        })
      );
    }
  };

  //adding to historyMix function
  const addToHistoryMix = (arrHisVids, arrHisMix, searchStrP) => {
    //checking not same searchTerm or the default searchTerm
    arrHisMix.unshift(arrHisVids[0].historyVidList[1]);
    arrHisMix.unshift(arrHisVids[0].historyVidList[0]);
    if (arrHisVids.length <= 2) {
      arrHisMix.pop();
      arrHisMix.pop();
    }
    //checking list length max 10 videos
    if (arrHisMix.length > 10) {
      arrHisMix.pop();
      arrHisMix.pop();
    }

    localStorage.setItem("historyMix", JSON.stringify(historyMixArr));
    setHistoryMix((prev) => historyMixArr);
  };

  //for default load and for api pagination
  useEffect(() => {
    getVideos();
  }, [nextPageToken]); //nextPageToken

  const checkDataHasId = (listP) => {
    for (let i = 0; i < listP.length; i++) {
      if (listP[i].id.videoId === undefined) {
        listP.splice(i, 1);
      }
    }
    return listP;
  };

  const handleSubmit = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      setLoadVideos((prev) => true);
      localStorage.setItem("searchItem", searchRef.current.value);
      getVideos();
    }
  };

  return (
    <VideoSearchContext.Provider
      value={{
        historyMix: historyMix,
        historyVideos: historyVideos,
        buttonHeart: buttonHeart,
        videos: videos,
        loadVideos: loadVideos,
        selectId: selectId,
        selectedVideo: selectedVideo,
        refreshMain: refreshMain,
        searchRef: searchRef,
        searchItem: searchItem,
        videoSearchErr: videoSearchErr,
        setVideos: setVideos,
        setNextPageToken: setNextPageToken,
        setLoadVideos: setLoadVideos,
        setSelectId: setSelectId,
        setSelectedVideo: setSelectedVideo,
        setSearchItem: setSearchItem,
        handleSubmit: handleSubmit,
        setRefreshMain: setRefreshMain,
      }}
    >
      {props.children}
    </VideoSearchContext.Provider>
  );
};

export default VideoSearchProvider;
export const VideoSearchContext = createContext();
