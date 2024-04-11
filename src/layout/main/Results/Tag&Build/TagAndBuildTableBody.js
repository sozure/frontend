import React, { useContext, useState } from "react";
import {
  BuildPipelinesContext,
  PaginationCounterContext,
} from "../../../../contexts/Contexts";
import PropTypes from "prop-types";
import TagAndBuildTableBodyRow from "./TagAndBuildTableBodyRow";

const TagAndBuildTableBody = ({ filteredRepositories }) => {
  const number = 5;
  const { paginationCounter } = useContext(PaginationCounterContext);
  const { buildPipelines } = useContext(BuildPipelinesContext);
  
  const [ latestTags, setLatestTags ] = useState([]);

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
          return (
            <TagAndBuildTableBodyRow
              key={repository.repositoryId}
              repository={repository}
              pipeline={result}
              latestTags={latestTags}
              setLatestTags={setLatestTags}
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
