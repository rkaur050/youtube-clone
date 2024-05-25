import React from "react";
import { Helmet } from "react-helmet";

const HelmetCustom = ({
  title = "Youtube",
  description = "Project with Youtube API and Reactjs",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default HelmetCustom;
