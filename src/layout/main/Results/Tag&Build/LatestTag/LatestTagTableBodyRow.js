import React from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";

const LatestTagTableBodyRow = ({ repository, latestTag }) => {
  return (
    <tr key={v4()}>
      <td key={repository.repositoryId}>{repository.repositoryName}</td>
      <td key={v4()}>{latestTag !== "" ? `${latestTag}` : "-"}</td>
    </tr>
  );
};

LatestTagTableBodyRow.propTypes = {
  repository: PropTypes.object.isRequired,
  latestTag: PropTypes.string.isRequired,
};

export default LatestTagTableBodyRow;
