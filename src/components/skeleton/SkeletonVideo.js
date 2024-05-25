import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonVideo = () => {
  return (
    <div style={{ width: "100%", margin: "1rem 0" }}>
      <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
        <Skeleton height={180} />
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "0.5rem" }}
        >
          <Skeleton circle height={40} width={40} />
          <div style={{ flex: 1, marginLeft: "0.5rem" }}>
            <Skeleton height={40} width="100%" />
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default SkeletonVideo;
