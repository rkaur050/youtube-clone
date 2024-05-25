import React, { useEffect, useState } from "react";
import "./_searchResults.scss";
import request from "../../api";
import { AiFillEye } from "react-icons/ai";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchResults = ({ video }) => {
  const {
    id,
    snippet: {
      channelTitle,
      channelId,
      title,
      publishedAt,
      description,
      thumbnails: { medium },
    },
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  useEffect(() => {
    const get_video_details = async () => {
      const response = await request.get("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id.videoId,
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
  }, [id.videoId]);

  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    get_channel_icon();
  }, [channelId]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${id.videoId}`);
  };

  return (
    <Row
      className="SearchResults m-1 py-2 align-items-center"
      onClick={handleClick}
    >
      <Col xs={6} md={4} className="SearchResults__left">
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className={"SearchResults__thumbnail"}
          wrapperClassName="SearchResults__thumbnail-wrapper"
        />
        <span className="SearchResults__duration">{_duration}</span>
      </Col>
      <Col xs={6} md={8} className="SearchResults__right p-0">
        <p className="SearchResults__title mb-1">{title}</p>
        <div className="SearchResults__details">
          <AiFillEye /> {numeral(views).format("0.a")} Views •{" "}
          {moment(publishedAt).fromNow()}
        </div>
        <p className="mt-1">{description}</p>
        <div className="SearchResults__channel d-flex align-items-center my-1">
          <LazyLoadImage src={channelIcon?.url} effect="blur" />
          <p className="mb-0">{channelTitle}</p>
        </div>
      </Col>
    </Row>
  );
};

export default SearchResults;
