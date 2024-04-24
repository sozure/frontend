import React, { useContext } from "react";
import {
  BuildPipelinesContext,
  LatestTagsContext,
  PaginationCounterContext,
} from "../../../../contexts/Contexts";
import PropTypes from "prop-types";
import TagAndBuildTableBodyRow from "./TagAndBuildTableBodyRow";

const TagAndBuildTableBody = ({ filteredRepositories }) => {
  const number = 5;
  const { paginationCounter } = useContext(PaginationCounterContext);
  const { buildPipelines } = useContext(BuildPipelinesContext);
  const { latestTags } = useContext(LatestTagsContext);

  return (
    <tbody>
      {filteredRepositories
        .slice(paginationCounter, paginationCounter + number)
        .map((repository) => {
          let result;
          buildPipelines.forEach((pipeline) => {
            if (pipeline.name === repository.repositoryName) {
              result = pipeline;
            }
          });
          let latestTag = latestTags[repository.repositoryId];
          return (
            <TagAndBuildTableBodyRow
              key={repository.repositoryId}
              repository={repository}
              pipeline={result}
              latestTag={latestTag === undefined ? "-" : latestTag}
            />
          );
        })}
    </tbody>
  );
};

TagAndBuildTableBody.propTypes = {
  filteredRepositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TagAndBuildTableBody;
