import React, { useContext } from "react";
import {
  LatestTagsContext,
  PaginationCounterContext,
} from "../../../../../contexts/Contexts";
import LatestTagTableBodyRow from "./LatestTagTableBodyRow";
import PropTypes from "prop-types";

const LatestTagTableBody = ({ filteredRepositories }) => {
  const number = 5;
  const { paginationCounter } = useContext(PaginationCounterContext);
  const { latestTags } = useContext(LatestTagsContext);

  return (
    <tbody>
      {filteredRepositories
        .slice(paginationCounter, paginationCounter + number)
        .map((repository) => {
          let latestTag = "";
          latestTags.forEach((element) => {
            if (element.repositoryId === repository.repositoryId) {
              latestTag = element.tag;
            }
          });
          return (
            <LatestTagTableBodyRow
              key={repository.repositoryId}
              repository={repository}
              latestTag={latestTag}
            />
          );
        })}
    </tbody>
  );
};

LatestTagTableBody.propTypes = {
  filteredRepositories: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default LatestTagTableBody;
