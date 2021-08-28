import { Fragment, useContext } from "react";

//CONTEXT IMPORTS
import { VideoSearchContext } from "../components/store/VideoSearchCtx";
import { VideoDetailContext } from "../components/store/VideoDetailCtx";
//COMPONENT IMPORTS
import CondensedHistoryList from "../components/CondensedHistoryList";
import SearchBar from "../components/SearchBar";
import VideoList from "../components/VideoList";

const MainPage = () => {
  const {
    videos,
    loadVideos,
    searchRef,
    handleSubmit,
    videoSearchErr,
    searchItem,
    refreshMain,
    setSearchItem,
    setVideos,
    setNextPageToken,
    setLoadVideos,
  } = useContext(VideoSearchContext);
  const { handleVideoSelect } = useContext(VideoDetailContext);

  let vidListTerm = searchItem ? searchItem : "penguins";
  let loadVideosL = loadVideos;
  //let searchRefM = searchRef;

  if (refreshMain) {
    vidListTerm = localStorage.getItem("searchItem");
    //loadVideosL = JSON.parse(localStorage.getItem(vidListTerm));
    //pageTokenL = localStorage.getItem("nextPageToken");
    //setSearchItem((prev) => searchTermL);
    //setVideos((prev) => vidL);
    //SORT OUT PAGETOKEN -> GET FROM setNextPageToken((prev) => pageTokenL);
    loadVideosL = false;
    //setRefreshMain((prev) => false);
    //setLoadVideos((prev) => false);
  }
  //let vidListTerm = JSON.parse(localStorage.getItem("searchItem"));
  // vidListTerm = searchRef.current.value ? searchRef.current.value : "penguins";
  /*
 if (
    searchRef.current.value !== undefined ||
    searchRef.current.value !== null
  ) {
    console.log("why you reading the condition if it doesn't apply to you");
    vidListTerm = searchRef.current.value
      ? searchRef.current.value
      : "penguins";
  }
*/
  /*//////////////from VideoSearchcontext
   if (refreshMain) {
        let searchTermL = localStorage.getItem("searchItem");
        let vidL = JSON.parse(localStorage.getItem(searchTermL));
        let pageTokenL = localStorage.getItem("nextPageToken");
        setSearchItem((prev) => searchTermL);
        setVideos((prev) => vidL);
        setNextPageToken((prev) => pageTokenL);
        setRefreshMain((prev) => false);
        setLoadVideos((prev) => false);
      } else {
  /////


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
        searchItem.localeCompare(location.pathname.substring(1))
      ) {
        console.log("browser was refreshed");
        setRefreshMain((prev) => true);
      }
    }
  }, [location.pathname, searchItem]);
*/
  return (
    <Fragment>
      <h1>MainPage</h1>
      <section className="section-searchbar-wrapper">
        <div className="border">
          <h1 className="heading1">Video Search </h1>
          <SearchBar searchRef={searchRef} handleSubmit={handleSubmit} />
        </div>
      </section>

      {videoSearchErr.status && (
        <h3 className="text-center">Error. Please try again later.</h3>
      )}

      {!videoSearchErr.status && (
        <section className="section-video-wrapper">
          <h2>Recommended Videos</h2>
          <VideoList
            loadVideos={loadVideosL}
            handleVideoSelect={handleVideoSelect}
            vidListTerm={vidListTerm}
            videoListType="videos"
          />
        </section>
      )}

      <div className="main-history-favorites-wrapper">
        <section className="searches-wrapper">
          <h2>Last searches</h2>
          <CondensedHistoryList />
        </section>
        <section className="searches-wrapper">
          <h2>Favorites</h2>
          <CondensedHistoryList />
        </section>
      </div>
    </Fragment>
  );
};

export default MainPage;

/*


*/
