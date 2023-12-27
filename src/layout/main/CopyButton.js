import React from "react";
import PropTypes from "prop-types";
import { FaCopy } from "react-icons/fa";

const CopyButton = ({ value }) => {
  return (
    <abbr title={"Copy value to clipboard"}>
      <button onClick={() => navigator.clipboard.writeText(value)}>
        <FaCopy />
      </button>
    </abbr>
  );
};

CopyButton.propTypes = {
    value: PropTypes.string.isRequired
}

export default CopyButton;
