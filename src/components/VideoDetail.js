import { Fragment } from "react";

const VideoDetail = ({ loadVideos, selectId, selectedVideo }) => {
  let url = null;
  let title = null;
  let date = null;
  let selectedVid = null;

  if (!loadVideos) {
    if (selectedVideo === null) {
      selectedVid = JSON.parse(localStorage.getItem("penguins"))[0];
      selectId = selectedVid.id.videoId;
    } else {
      selectedVid = selectedVideo;
    }
  }

  return (
    <div className="videodetail-card">
      {!loadVideos && (
        <div>
          <h4>VideoDetail component</h4>

          <div className="video-thumbnail">
            <iframe
              src={`https://www.youtube.com/embed/${selectId}?controls=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
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

  <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${selectId}?controls=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

*/
//rbzxxbuk3sk
