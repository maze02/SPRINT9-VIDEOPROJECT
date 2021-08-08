import { Fragment } from "react";

const VideoDetail = ({ loadVideos, selectId, selectedVideo }) => {
  let url = null;
  let title = null;
  let date = null;
  let selectedVid = null;

  if (!loadVideos) {
    selectedVid = JSON.parse(localStorage.getItem("penguins"))[0];

    if (selectedVideo !== null) {
      selectedVid = selectedVideo;
    }
  }

  return (
    <div className="videodetail-card">
      {!loadVideos && (
        <div>
          <h4>VideoDetail component</h4>
          <div className="video-thumbnail">
            <div class="video">
              <span></span>
              <img
                src={selectedVid.snippet.thumbnails.high.url}
                alt={selectedVid.snippet.title}
              />
            </div>
          </div>
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
