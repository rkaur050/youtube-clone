import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Video from "../../components/video/Video";
import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/videos.action";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonVideo from "../../components/skeleton/SkeletonVideo";

export default function HomeScreen() {
  const dispatch = useDispatch();

  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );

  useEffect(() => {
    if (activeCategory === "All") dispatch(getPopularVideos());
    else dispatch(getVideosByCategory(activeCategory));
  }, [dispatch, activeCategory]);

  const fetchData = () => {
    if (activeCategory === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(activeCategory));
    }
  };

  return (
    <Container>
      <CategoriesBar />
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div className="spinner-border text-danger d-block mx-auto"></div>
        }
      >
        <Row>
          {!loading
            ? videos.map((video) => (
                <Col key={video.id} lg={4} md={3}>
                  <Video video={video} />
                </Col>
              ))
            : [...Array(20)].map((_, index) => (
                <Col key={index} lg={4} md={3}>
                  <SkeletonVideo />
                </Col>
              ))}
        </Row>
      </InfiniteScroll>
    </Container>
  );
}
