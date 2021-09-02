import styled from "styled-components";
import { Fragment, useContext } from "react";
import { VideoSearchContext } from "./store/VideoSearchCtx";
import { VideoDetailContext } from "./store/VideoDetailCtx";
import { useLocation } from "react-router";
const VideoDetail = () => {
  const { loadVideos, selectId, selectedVideo } =
    useContext(VideoSearchContext);

  const { refreshFlag, setRefreshFlag } = useContext(VideoDetailContext);

  const location = useLocation();
  //handle refreshing browser
  let localId = JSON.parse(localStorage.getItem("selectId"));
  let browserParamId = location.pathname.substring(13);
  console.log("browserParamId " + browserParamId);

  let url = null;
  let title = null;
  let date = null;
  let selectedVid = null;
  let selectIdDetail = browserParamId;
  if (localId == browserParamId && selectId !== browserParamId) {
    setRefreshFlag((prev) => true);
  }

  if (!loadVideos) {
    selectedVid = JSON.parse(localStorage.getItem("selectedVideo"));
    selectIdDetail = selectedVid.id.videoId;
  }

  return (
    <VideoDetailComponent>
      {!loadVideos && (
        <div className="videodetail-card">
          <div className="video-thumbnail">
            <iframe
              src={`https://www.youtube.com/embed/${selectIdDetail}?controls=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="description">
            <h5>{selectedVid.snippet.title}</h5>
            <p>{selectedVid.snippet.description}</p>
          </div>
        </div>
      )}
      {loadVideos && <p>video loading</p>}
    </VideoDetailComponent>
  );
};

const VideoDetailComponent = styled.article`
  width: 100%;

  .videodetail-card {
    border-radius: 1rem !important;
    margin: 0.7rem;
    width: auto;
    // margin-top: 0rem !important;
    background-color: blue;
    display: flex;
    flex-direction: column;
    //flex-direction: horizontal;
    /*top: 7rem;*/
    position: sticky;
    overflow-y: scroll;
    //height: calc(95vh - 80px);
    /*calc(100vh - 80px)*/
    /*  width: 90vw; */

    //max-width: 300px;
    //background: grey;

    border-radius: 0.25rem;

    position: sticky;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    } /* for Chrome, Safari, and Opera */

    .video-thumbnail {
      margin: 0rem 1rem 0rem 0rem;
      cursor: pointer;
      overflow: hidden;
      padding-top: 56.25%; /* 16:9*/
      position: relative;
      iframe {
        border: 0;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }
    }

    .description {
      margin: 1rem 1rem 1rem 0rem;
      color: black;
      h5 {
        margin-top: 1rem;
      }

      p {
        margin-top: -0.7rem;
        padding-bottom: 1rem;
        padding-right: 1rem;
      }
      h5,
      p {
        padding-left: 1rem;
      }
    }

    @media screen and (min-width: 578px) {
      //margin: 1rem 2rem 1rem 0rem;
      margin: 1rem !important;
      padding: 1rem !important;
      width: auto;
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      background-color: lightcyan;

      .video-thumbnail {
        margin: 0rem 1rem 0rem 0rem;
        cursor: pointer;
        overflow: hidden;
        padding-top: 56.25%; /* 16:9*/
        position: relative;
        iframe {
          border: 0;
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          width: 100%;
        }
      }
    }
  }
`;
export default VideoDetail;
