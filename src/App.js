import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";

const App = () => {
  const [videos, setVideos] = useState([]);
  const searchRef = useRef();
  const [videoSearchErr, setVideoSearchErr] = useState({
    status: false,
    errLog: [],
  });
  const [loadVideos, setLoadVideos] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [loadSelVideo, setLoadSelVideo] = useState(false);
  const [selVidErr, setSelVidErr] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [selectId, setSelectId] = useState("");

  const getVideos = async () => {
    let apiKey1 = "AIzaSyBDTa_O7QZwGJ4mIvREEEuYgvgp4h5YzfM";
    let apiKey = "AIzaSyC2K8hzdZpjh9d_U1iNFFAxCt5vrO8-znM";

    try {
      let searchStr = searchRef.current.value
        ? searchRef.current.value
        : "penguins";
      let res = await axios.get(
        "https://youtube.googleapis.com/youtube/v3/search?",
        {
          params: {
            part: "snippet",
            maxResults: 25,
            q: searchStr,
            key: apiKey,
            videoEmbeddable: "any",
          },
        }
      );
      await console.log(searchStr);
      await console.log(res.data.items);
      await setVideos((prev) => res.data.items);
      await localStorage.setItem(searchStr, JSON.stringify(res.data.items));
      setVideoSearchErr((prev) => {
        return {
          status: false,
          errLog: [...videoSearchErr.errLog],
        };
      });
      setLoadVideos(false);
    } catch (error) {
      setLoadVideos(false);
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

  //for default load
  useEffect(() => {
    getVideos();
  }, []);

  //get default load from firestore?

  useEffect(() => {
    localStorage.setItem("videoSearchErr", JSON.stringify(videoSearchErr));
    console.log(videoSearchErr.errLog.length);
  }, [videoSearchErr]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoadVideos(true);
    console.log("submitting " + searchRef.current.value);
    setSearchItem((prev) => searchRef.current.value);
    localStorage.setItem("searchItem", searchRef.current.value);
    getVideos();
  };

  const handleVideoSelect = (id) => {
    console.log(id);
    console.log("Hey I clicked on an image and its id is:" + id);
    setSelectId((prev) => id);
    localStorage.setItem("selectId", JSON.stringify(selectId));
  };

  return (
    <div>
      <h1>Video Project App </h1>
      <SearchBar searchRef={searchRef} handleSubmit={handleSubmit} />
      {videoSearchErr.status && (
        <h2 className="text-center">Error. Please try again later.</h2>
      )}
      {!videoSearchErr.status && (
        <section className="section-video-wrapper">
          <VideoDetail loadVideos={loadVideos} selectId={selectId} />
          <VideoList
            loadVideos={loadVideos}
            searchRef={searchRef}
            handleVideoSelect={handleVideoSelect}
          />
        </section>
      )}
    </div>
  );
};

export default App;
