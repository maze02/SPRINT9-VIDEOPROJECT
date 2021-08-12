import { Fragment, useState, useRef, useEffect, useCallback } from "react";
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
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loadSelVideo, setLoadSelVideo] = useState(false);
  const [selVidErr, setSelVidErr] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [selectId, setSelectId] = useState("");
  const [nextPageToken, setNextPageToken] = useState("");

  const getVideos = async () => {
    let apiKey = `${process.env.REACT_APP_ACCESS_KEY1}`;
    let apiKey1 = `${process.env.REACT_APP_ACCESS_KEY2}`;

    try {
      let searchStr = searchRef.current.value
        ? searchRef.current.value
        : "penguins";
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

      /*
      await localStorage.setItem(searchStr, JSON.stringify(res.data.items));
*/
      if (
        videos.length === 0 ||
        searchStr.localeCompare(
          JSON.parse(localStorage.getItem(searchItem))
        ) !== 0
      ) {
        await localStorage.setItem(searchStr, JSON.stringify(res.data.items));
        await setVideos((previousVideos) => {
          return res.data.items;
        });
      } else {
        await localStorage.setItem(
          searchStr,
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

      await localStorage.setItem("nextPageToken", res.data.nextPageToken);
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

  const handleVideoSelect = (id) => {
    console.log(id);
    console.log("Hey I clicked on an image and its id is:" + id);
    setSelectId((prev) => id);
    localStorage.setItem("selectId", JSON.stringify(selectId));
    console.log("searchItem : " + searchItem);
    console.log("videos : " + videos);
    //let searchItemNow = JSON.parse(localStorage.getItem("searchItem"));
    //console.log("searchItemNow  =" + searchItemNow);
    /*
    let searchArr = JSON.parse(localStorage.getItem(searchItemNow));
    */
    let selectItem = null;
    for (let i = 0; i < videos.length; i++) {
      if (id.localeCompare(videos[i].id.videoId) === 0) {
        selectItem = videos[i];
        console.log("OIIII selectedItem's id   " + selectItem.id.videoId);
        setSelectedVideo((prev) => selectItem);
        localStorage.setItem("selectedVideo", selectItem);
      }
    }
  };

  return (
    <Fragment>
      <header>
        <div className="border">
          <h1 className="heading1">Video Search </h1>
          <SearchBar searchRef={searchRef} handleSubmit={handleSubmit} />
        </div>
      </header>
      <main>
        {videoSearchErr.status && (
          <h2 className="text-center">Error. Please try again later.</h2>
        )}
        {!videoSearchErr.status && (
          <section className="section-video-wrapper">
            <VideoDetail
              loadVideos={loadVideos}
              selectId={selectId}
              selectedVideo={selectedVideo}
            />
            <VideoList
              loadVideos={loadVideos}
              searchRef={searchRef}
              handleVideoSelect={handleVideoSelect}
            />
          </section>
        )}
      </main>
    </Fragment>
  );
};

export default App;

/*
 if (videos.length === 0) {
        await localStorage.setItem(searchStr, JSON.stringify(res.data.items));
      } else {
        await localStorage.setItem(
          searchStr,
          JSON.stringify([...videos, res.data.items])
        );
      }

*/

/*
     await setSelectedVideo((prev) => videos[0]);
      await setSelectId((prev) => videos[0].id.videoId);
*/
