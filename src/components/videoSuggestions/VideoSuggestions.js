import React, { useEffect, useState } from "react";
import "./_videoSuggestions.scss";
import request from "../../api";
import { AiFillEye } from "react-icons/ai";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const VideoSuggestions = ({ video }) => {
  const {
    snippet: {
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails: { videoId },
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  useEffect(() => {
    const get_video_details = async () => {
      const response = await request.get("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: videoId,
        },
      });
      const {
        data: { items },
      } = response;
      if (items && items.length > 0) {
        setDuration(items[0].contentDetails.duration);
        setViews(items[0].statistics.viewCount);
      }
    };
    get_video_details();
  }, [videoId]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${videoId}`);
  };

  return (
    <Row
      className="videoSuggestions m-1 py-2 align-items-center"
      onClick={handleClick}
    >
      <Col xs={6} md={6} className="videoSuggestions__left">
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className="videoSuggestions__thumbnail"
          wrapperClassName="videoSuggestions__thumbnail-wrapper"
        />
        <span className="videoSuggestions__duration">{_duration}</span>
      </Col>
      <Col xs={6} md={6} className="videoSuggestions__right p-0">
        <p className="videoSuggestions__title mb-1">{title}</p>
        <div className="videoSuggestions__details">
          <AiFillEye /> {numeral(views).format("0.a")} Views •{" "}
          {moment(publishedAt).fromNow()}
        </div>
        <div className="videoSuggestions__channel d-flex align-items-center my-1">
          <p className="mb-0">{channelTitle}</p>
        </div>
      </Col>
    </Row>
  );
};

export default VideoSuggestions;
