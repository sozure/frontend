import React from "react";
import { ClipLoader } from "react-spinners";
import PropTypes from "prop-types";

const CustomClipLoader = ({size}) => {
  const container = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <div style={container}>
      {size === undefined ? (
        <ClipLoader
          loading={true}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <ClipLoader
          loading={true}
          size={size}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </div>
  );
};

CustomClipLoader.propTypes = {
  size: PropTypes.number
};

export default CustomClipLoader;
