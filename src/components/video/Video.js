import React, { useEffect, useState } from "react";
import "./_video.scss";
import { AiFillEye } from "react-icons/ai";
import request from "../../api";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

export default function Video({ video }) {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;
  
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const navigate = useNavigate();

  useEffect(() => {
    const get_video_details = async () => {
      let videoId = id;
      if (typeof id === "object") {
        videoId = id.videoId;
      }
      const {
        data: { items },
      } = await request.get("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: videoId,
        },
      });

      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    get_video_details();
  }, [id]);

  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request.get("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    get_channel_icon();
  }, [channelId]);

  const hanldeVideoClick = () => {
    navigate(`/watch/${id}`);
  };

  return (
    <div className="video" onClick={hanldeVideoClick}>
      <div className="video__top">
        {/* <img src={medium.url} alt="video-img" /> */}
        <LazyLoadImage src={medium.url} effect="blur" />
        <span className="video__top__duration">{_duration}</span>
      </div>
      <div className="video__title">{title}</div>
      <div className="video__details">
        <span>
          <AiFillEye /> {numeral(views).format("0.a")} Views •
        </span>
        <span>{moment(publishedAt).fromNow()}</span>
      </div>
      <div className="video__channel">
        <LazyLoadImage src={channelIcon?.url} effect="blur" />
        <p>{channelTitle}</p>
      </div>
    </div>
  );
}
