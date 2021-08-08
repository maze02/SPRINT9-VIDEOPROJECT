import { Fragment } from "react";

const VideoDetail = ({ loadVideos, selectId }) => {
  let url = null;
  let title = null;
  let date = null;
  let selectedVid = null;

  if (!loadVideos) {
    selectedVid = JSON.parse(localStorage.getItem("penguins"))[0];
    //loop through to find the video
    /*
    if (selectId !== "") {
      
    }
*/
  }

  return (
    <div className="videodetail-card">
      {!loadVideos && (
        <div>
          <h4>VideoDetail component</h4>
          <img
            src={selectedVid.snippet.thumbnails.high.url}
            alt={selectedVid.snippet.title}
          />
          <h5>{selectedVid.snippet.title}</h5>
          <p>{selectedVid.snippet.publishTime}</p>
          <p>{selectedVid.snippet.description}</p>
        </div>
      )}
      {loadVideos && <p>video loading</p>}
    </div>
  );
};

export default VideoDetail;

/*
  useEffect(() => {
    let localId = JSON.parse(localStorage.getItem("selectId"));
    let detailId = localId ? localId : "OF0w9z_JUJs";
  }),[selectId];

*/
