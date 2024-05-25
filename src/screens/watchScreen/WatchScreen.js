import React, { useEffect } from "react";
import "./_watchScreen.scss";
import { Col, Row } from "react-bootstrap";
import VideoMetaData from "../../components/videoMetaData/VideoMetaData";
import VideoSuggestions from "../../components/videoSuggestions/VideoSuggestions";
import { getPlaylistVideos } from "../../redux/actions/playlist.action";
import Comments from "../../components/comments/Comments";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideoById } from "../../redux/actions/videos.action";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getChannelDetails } from "../../redux/actions/channel.action";

const WatchScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const location=useLocation();

  const { video, loading } = useSelector((state) => state.selectedVideo);
  const channelDetails = useSelector((state) => state.channelDetails);

  const channelId = video?.snippet?.channelId;
  const uploads =
    channelDetails.channel?.contentDetails?.relatedPlaylists?.uploads;

  useEffect(() => {
    if (id) {
      dispatch(getVideoById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (channelId) {
      dispatch(getChannelDetails(channelId));
    }
  }, [dispatch, channelId]);

  useEffect(() => {
    if (uploads) {
      dispatch(getPlaylistVideos(uploads));
    }
  }, [dispatch, uploads]);

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location]);

  const { videos: playlistVideos, loading: playlistLoading } = useSelector(
    (state) => state.playlistVideos
  );

  return (
    <Row>
      <Col lg={8}>
        <div className="watchscreen__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={video?.snippet?.title}
            allowFullScreen
            width="100%"
            height="100%"
            style={{ border: 'none'}}
          ></iframe>
        </div>
        {!loading ? (
          <VideoMetaData video={video} videoId={id} />
        ) : (
          <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
            <Skeleton width="100%" height="100px" />
          </SkeletonTheme>
        )}
        {video && <Comments videoId={id} video={video} />}
      </Col>
      <Col lg={4}>
        {!playlistLoading ? (
          playlistVideos.map((video, i) => (
            <VideoSuggestions key={i} video={video} />
          ))
        ) : (
          <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
            <Skeleton width="100%" height="130px" count={15} />
          </SkeletonTheme>
        )}
      </Col>
    </Row>
  );
};

export default WatchScreen;
