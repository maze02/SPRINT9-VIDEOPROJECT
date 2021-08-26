import { createContext, useState, useEffect, useRef, useCallback } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
//import { useLocation } from "react-router";
import axios from "axios";

const VideoSearchProvider = (props) => {
  let searchTerm = localStorage.getItem("searchItem")
    ? localStorage.getItem("searchItem")
    : "penguins";

  const history = useHistory();
  const location = useLocation();
  //const { searchTerm } = useParams();
  const [refreshMain, setRefreshMain] = useState(true);
  const searchRef = useRef();
  const [searchItem, setSearchItem] = useState(searchTerm);
  console.log("11111" + searchItem);
  console.log("Eiiiiiii searchItem" + localStorage.getItem("searchItem"));
  const [videos, setVideos] = useState([]);
  const [loadVideos, setLoadVideos] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectId, setSelectId] = useState("");
  const [nextPageToken, setNextPageToken] = useState("");
  const [videoSearchErr, setVideoSearchErr] = useState({
    status: false,
    errLog: [],
  });
  const [loadSelVideo, setLoadSelVideo] = useState(false);
  const [selVidErr, setSelVidErr] = useState(false);

  if (refreshMain) {
    console.log("AT REFRESH CHECKPOINT");
    if (localStorage.getItem("searchItem")) {
      console.log("searchTerm :" + searchTerm);
      let res = searchTerm.localeCompare(location.pathname.substring(1));
      console.log("comparison result of local and url " + res);
      //refresh scenario
      if (
        res === 0 &&
        searchItem.localeCompare(location.pathname.substring(1)) !== 0
      ) {
        console.log("WOOOOOWWWWW browser was refreshed");
        setRefreshMain((prev) => true);
        console.log("refresh status -> " + refreshMain);
      }
    } else {
      console.log("NOT REFRESH");
      setRefreshMain((prev) => false);
    }
  }

  const getVideos = async () => {
    console.log("2nd LOAD VIDEOS AFTER REFRESH CHECK");
    let apiKey0 = `${process.env.REACT_APP_ACCESS_KEY1}`;
    let apiKey1 = `${process.env.REACT_APP_ACCESS_KEY2}`;
    let apiKey3 = `AIzaSyBNV1xLcc3zEuseiBN2ZNiDEIe3WpUM_RM`;
    let apiKey = `AIzaSyBQu_RLMTu-Fd9s-dTMNZcbRI04rbcM8zs`;
    console.log(
      "location.pathname before history.push=" + location.pathname.substring(1)
    );

    try {
      //getting videos as a result of submitting something in the search bar, therefore not as a result of refreshing.

      // setRefreshMain((prev) => false);
      //  console.log("OOOOOOHHHH setting refresh main to false : " + refreshMain);
      //let searchLocal = localStorage.getItem("searchItem");
      let searchStr = searchRef.current.value
        ? searchRef.current.value
        : searchTerm;
      /*
      if (searchLocal) {
        searchLocal = JSON.parse(localStorage.getItem("searchItem"));
        searchStr = searchLocal;
      } */

      history.push(`/${searchStr}`);

      let res = nextPageToken
        ? await axios.get("https://youtube.googleapis.com/youtube/v3/search?", {
            params: {
              part: "snippet",
              maxResults: 25,
              pageToken: nextPageToken,
              q: searchStr,
              key: apiKey,
              videoEmbeddable: "any",
            },
          })
        : await axios.get("https://youtube.googleapis.com/youtube/v3/search?", {
            params: {
              part: "snippet",
              maxResults: 25,
              q: searchStr,
              key: apiKey,
              videoEmbeddable: "any",
            },
          });
      await console.log(searchStr);
      await console.log(res.data.items);
      //1st load scenario and new search term entered scenario
      if (
        videos.length === 0 ||
        searchStr.localeCompare(
          JSON.parse(localStorage.getItem(searchItem))
        ) !== 0
      ) {
        await localStorage.setItem(searchStr, JSON.stringify(res.data.items));
        await localStorage.setItem("videos", JSON.stringify(res.data.items));
        await setVideos((previousVideos) => {
          return res.data.items;
        });
      } else {
        //Scenario that the new pagetoken is added but have the same searchtern
        await localStorage.setItem(
          searchStr,
          JSON.stringify([...videos, ...res.data.items])
        );
        await localStorage.setItem(
          "videos",
          JSON.stringify([...videos, ...res.data.items])
        );
        await setVideos((previousVideos) => {
          return [...previousVideos, ...res.data.items];
        });
      }

      setVideoSearchErr((prev) => {
        return {
          status: false,
          errLog: [...videoSearchErr.errLog],
        };
      });
      //setting the page token corresponding the current list downloaded
      await localStorage.setItem("nextPageToken", res.data.nextPageToken);
      //setting the searchItem to the current ref or "penguins" - refresh not considered here
      await setSearchItem((prev) => searchStr);
      await localStorage.setItem("searchItem", searchStr);
      await setSelectedVideo(
        (prev) => JSON.parse(localStorage.getItem(searchStr))[0]
      );
      await setSelectId(
        (prev) => JSON.parse(localStorage.getItem(searchStr))[0].id.videoId
      );
      //await setSelectedVideo((prev) => res.data.items[0]);
      //await setSelectId((prev) => res.data.items[0].id.videoId);
      await setLoadVideos((prev) => false);
      await console.log(
        "location.pathname after big code=" + location.pathname.substring(1)
      );
    } catch (error) {
      setLoadVideos((prev) => false);
      console.log(error.message);
      console.log(error.statusCode);
      setVideoSearchErr((prev) => {
        return {
          status: true,
          errLog: [...videoSearchErr.errLog, { error }],
        };
      });
    }
  };

  //for default load and for api pagination
  useEffect(() => {
    getVideos();
  }, [nextPageToken]); //nextPageToken

  //infinite scroll
  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      // console.log(`innerHeight ${window.innerHeight}`);
      // console.log(`scrollY ${window.scrollY}`);
      // console.log(`body height ${document.body.scrollHeight}`);

      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 10
      ) {
        console.log("it worked");
        console.log("why aren't you printing");
        let nextPageTokenL = localStorage.getItem("nextPageToken");
        console.log("why aren't you printing");
        console.log(nextPageTokenL);
        setNextPageToken((prev) => nextPageTokenL);
        console.log(nextPageTokenL);
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, []);

  //get default load from firestore?
  useEffect(() => {
    localStorage.setItem("videoSearchErr", JSON.stringify(videoSearchErr));
    console.log(videoSearchErr.errLog.length);
  }, [videoSearchErr]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoadVideos((prev) => true);
    console.log("submitting " + searchRef.current.value);
    getVideos();
  };
  /*
  useEffect(() => {
    setSearchItem((prev) => searchRef.current.value);
  }, [searchRef.current.value]);
*/

  /*
  useEffect(() => {
    console.log("1st REFRESH CHECK");
    console.log("location.pathname OIIII" + location.pathname.substring(1));
    let localSearch = localStorage.getItem("searchItem");
    if (localSearch) {
      console.log("localSearch :" + localSearch);
      let res = localSearch.localeCompare(location.pathname.substring(1));
      console.log("comparison result of local and url " + res);
      //refresh scenario

      if (
        res === 0 &&
        searchItem.localeCompare(location.pathname.substring(1)) !== 0
      ) {
        console.log("browser was refreshed");
        setRefreshMain((prev) => true);
      }
    }
  }, [location.pathname, searchItem]);
*/
  return (
    <VideoSearchContext.Provider
      value={{
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
