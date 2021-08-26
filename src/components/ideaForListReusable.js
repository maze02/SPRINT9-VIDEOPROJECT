
import { useContext } from "react";
import { VideoSearchContext } from "../components/store/VideoSearchCtx";
import { VideoDetailContext } from "./store/VideoDetailCtx";
const otherComp =() =>{
 const { loadVideos, searchRef } = useContext(VideoSearchContext);
 const { handleVideoSelect } = useContext(VideoDetailContext);

 if (
      searchRef.current.value !== null ||
      searchRef.current.value !== undefined
    ) {
      let vidListTerm = searchRef.current.value
        ? searchRef.current.value
        : "penguins";
}

const VideoList = (loadVideos, handleVideoSelect, vidListTerm) => {
 
  let videoListShow = null;
  try {
      let videoListArr = JSON.parse(localStorage.getItem(vidListTerm));
if(videoListArr){
      videoListShow = videoListArr.map((e, index) => {
        return (
          <VideoItem
            key={index}
            id={e.id.videoId}
            title={e.snippet.title}
            description={e.snippet.description}
            url={e.snippet.thumbnails.medium.url}
            date={e.snippet.publishTime}
            handleVideoSelect={handleVideoSelect}
          />
        );
      });
    }else{
        return(
            <h4>No videos could be found</h4>
        )
    }
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="videolist-wrapper">
      {loadVideos && <p>Loading videoList...</p>}
      {!loadVideos && videoListShow !== null && videoListShow}
    </div>
  );
};

//export default VideoList;